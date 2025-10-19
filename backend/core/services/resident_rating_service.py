import asyncio
from datetime import datetime
from typing import Any, List
import math

from backend.core.dto.dashboard import (
    ResidentRatingDTO, ResidentRatingMetricDTO, HotVacancyDTO, 
    VacancyGradeDistributionDTO, VacancyWorkFormatDistributionDTO, TagStatsByMonthDTO, TagStatsDTO
)
from backend.core.dto.vacancy_dto import TagDTO
from backend.core.repositories.resident_rating_repository import ResidentRatingRepository


class ResidentRatingService:
    def __init__(self, resident_rating_repository: ResidentRatingRepository):
        self.resident_rating_repository = resident_rating_repository

    def _calculate_change_percentage(self, current: int, previous: int) -> float:
        """Рассчитать процентное изменение"""
        if previous == 0:
            return 100.0 if current > 0 else 0.0
        return ((current - previous) / previous) * 100

    def _calculate_rating_score(
        self,
        open_vacancies: int,
        viewed_applications: int,
        screenings: int,
        interviews: int,
        offers: int,
        rejections: int,
        applications_per_vacancy_ratio: float,
        freshness_index: float,
        university_applications_share: float
    ) -> float:
        """
        Формула расчета рейтинга компании:
        
        Базовые метрики (вес 40%):
        - Активность найма (количество вакансий и откликов)
        
        Эффективность процессов (вес 30%):
        - Конверсия по воронке (скрининг -> интервью -> оффер)
        
        Качество взаимодействия (вес 20%):
        - Свежесть вакансий
        - Доля откликов от вузов
        
        Привлекательность (вес 10%):
        - Соотношение откликов к среднему по платформе
        """
        
        # 1. Активность найма (0-100)
        activity_score = min(100, (open_vacancies * 10 + viewed_applications * 2) / 2)
        
        # 2. Эффективность процессов (0-100)
        # Конверсия по воронке
        total_processed = screenings + interviews + offers + rejections
        if total_processed > 0:
            conversion_score = ((offers / total_processed) * 100) + ((interviews / total_processed) * 50)
        else:
            conversion_score = 0
        
        efficiency_score = conversion_score
        
        # 3. Качество взаимодействия (0-100)
        freshness_score = freshness_index * 100  # индекс свежести как процент
        university_score = university_applications_share * 100  # доля вузов как процент
        quality_score = (freshness_score * 0.5 + university_score * 0.5)
        
        # 4. Привлекательность (0-100)
        # Нормализуем соотношение откликов (1.0 = среднее по платформе)
        attractiveness_score = min(100, max(0, applications_per_vacancy_ratio * 50))
        
        # Итоговый рейтинг с весами
        final_score = (
            activity_score * 0.40 +
            efficiency_score * 0.30 +
            quality_score * 0.20 +
            attractiveness_score * 0.10
        )
        
        # Нормализуем до 0-100
        return round(min(100, max(0, final_score)), 2)

    async def get_residents_rating(self) -> List[ResidentRatingDTO]:
        companies = await self.resident_rating_repository.get_companies_with_vacancies()
        # residents_rating = await asyncio.gather(*[
        #     self.get_company_detail(company) for company in companies
        # ])
        residents_rating = [await self.get_company_detail(company) for company in companies]
        return sorted(residents_rating, key=lambda x: x.rating_score, reverse=True)

    async def get_company_detail(self, company: dict[str, Any]) -> ResidentRatingDTO | None:
        company_id = company['company_id']
        
        global_avg_apps = await self.resident_rating_repository.get_global_avg_applications_per_vacancy()
        
        current_open_vacancies = await self.resident_rating_repository.get_open_vacancies_count(company_id, True)
        current_viewed_applications = await self.resident_rating_repository.get_viewed_applications_count(company_id, True)
        current_screenings = await self.resident_rating_repository.get_screenings_count(company_id, True)
        current_interviews = await self.resident_rating_repository.get_interviews_count(company_id, True)
        current_offers = await self.resident_rating_repository.get_offers_count(company_id, True)
        current_rejections = await self.resident_rating_repository.get_rejections_count(company_id, True)
        
        previous_open_vacancies = await self.resident_rating_repository.get_open_vacancies_count(company_id, False)
        previous_viewed_applications = await self.resident_rating_repository.get_viewed_applications_count(company_id, False)
        previous_screenings = await self.resident_rating_repository.get_screenings_count(company_id, False)
        previous_interviews = await self.resident_rating_repository.get_interviews_count(company_id, False)
        previous_offers = await self.resident_rating_repository.get_offers_count(company_id, False)
        previous_rejections = await self.resident_rating_repository.get_rejections_count(company_id, False)
        
        # Дополнительные метрики
        avg_apps_per_vacancy = await self.resident_rating_repository.get_avg_applications_per_vacancy(company_id)
        freshness_index = await self.resident_rating_repository.get_freshness_index(company_id)
        university_share = await self.resident_rating_repository.get_university_applications_share(company_id)
        
        # Рассчитываем соотношение к глобальному среднему
        applications_ratio = avg_apps_per_vacancy / global_avg_apps if global_avg_apps > 0 else 1.0
        
        # Рассчитываем рейтинг
        rating_score = self._calculate_rating_score(
            current_open_vacancies,
            current_viewed_applications,
            current_screenings,
            current_interviews,
            current_offers,
            current_rejections,
            applications_ratio,
            freshness_index,
            university_share
        )
        
        # Получаем дополнительные данные
        top_tags_data = await self.resident_rating_repository.get_top_tags_last_month(company_id, limit=10)
        hot_vacancy_data = await self.resident_rating_repository.get_hot_vacancy(company_id)
        grade_distribution = await self.resident_rating_repository.get_vacancy_grade_distribution(company_id)
        work_format_distribution = await self.resident_rating_repository.get_vacancy_work_format_distribution(company_id)
        
        current_month = datetime.now().month
        # Формируем DTO для горящей вакансии
        hot_vacancy = None
        if hot_vacancy_data:
            hot_vacancy = HotVacancyDTO(
                id=hot_vacancy_data['id'],
                title=hot_vacancy_data['title'],
                days_open=hot_vacancy_data['days_open']
            )
        
        # Формируем DTO для распределения по грейдам
        vacancy_grade_distribution = [
            VacancyGradeDistributionDTO(
                grade=grade['grade'],
                count=grade['count'],
                avg_salary=grade['avg_salary']
            )
            for grade in grade_distribution
        ]
        
        # Формируем DTO для распределения по формату работы
        vacancy_work_format_distribution = [
            VacancyWorkFormatDistributionDTO(
                work_format=work_format['work_format'],
                count=work_format['count']
            )
            for work_format in work_format_distribution
        ]
        
        return ResidentRatingDTO(
            company_id=company['company_id'],
            company_name=company['company_name'],
            rating_score=rating_score,
            icon_url=company['icon_url'],
            industry=company['industry'],
            site_url=company['site_url'],
            
            # Основные метрики с динамикой
            open_vacancies=ResidentRatingMetricDTO(
                current_value=current_open_vacancies,
                change_from_last_month=current_open_vacancies - previous_open_vacancies,
                change_percentage=self._calculate_change_percentage(current_open_vacancies, previous_open_vacancies)
            ),
            viewed_applications=ResidentRatingMetricDTO(
                current_value=current_viewed_applications,
                change_from_last_month=current_viewed_applications - previous_viewed_applications,
                change_percentage=self._calculate_change_percentage(current_viewed_applications, previous_viewed_applications)
            ),
            screenings_conducted=ResidentRatingMetricDTO(
                current_value=current_screenings,
                change_from_last_month=current_screenings - previous_screenings,
                change_percentage=self._calculate_change_percentage(current_screenings, previous_screenings)
            ),
            interviews_conducted=ResidentRatingMetricDTO(
                current_value=current_interviews,
                change_from_last_month=current_interviews - previous_interviews,
                change_percentage=self._calculate_change_percentage(current_interviews, previous_interviews)
            ),
            offers_sent=ResidentRatingMetricDTO(
                current_value=current_offers,
                change_from_last_month=current_offers - previous_offers,
                change_percentage=self._calculate_change_percentage(current_offers, previous_offers)
            ),
            rejections=ResidentRatingMetricDTO(
                current_value=current_rejections,
                change_from_last_month=current_rejections - previous_rejections,
                change_percentage=self._calculate_change_percentage(current_rejections, previous_rejections)
            ),
            
            # Дополнительные метрики
            avg_applications_per_vacancy=round(avg_apps_per_vacancy, 2),
            global_avg_applications_per_vacancy=round(global_avg_apps, 2),
            applications_per_vacancy_ratio=round(applications_ratio, 2),
            freshness_index=round(freshness_index, 2),
            university_applications_share=round(university_share, 2),
            
            # Специальные данные
            top_tags=[TagStatsDTO(tag=TagDTO(id=tag['id'], name=tag['name']), count=tag['count']) for tag in top_tags_data],
            hot_vacancy=hot_vacancy,
            vacancy_grade_distribution=vacancy_grade_distribution,
            vacancy_work_format_distribution=vacancy_work_format_distribution
        )
