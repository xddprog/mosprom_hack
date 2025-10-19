from datetime import datetime

from backend.core.dto.dashboard import (
    DashboardDTO, DashboardStatsDTO, TagStatsByMonthDTO, TagStatsDTO, 
    AvgSalaryByGradeDTO, ActivityDTO, StuckApplicationsDTO, CompanyActivityDTO, 
    SupplyDemandDTO, ResidentRatingDTO, ResidentRatingMetricDTO, 
    HotVacancyDTO, VacancyGradeDistributionDTO
)
from backend.core.dto.vacancy_dto import TagDTO
from backend.core.repositories.dashboard_repository import DashboardRepository
from backend.core.services.resident_rating_service import ResidentRatingService

class DashboardService:
    def __init__(self, dashboard_repository: DashboardRepository):
        self.dashboard_repository = dashboard_repository

    @staticmethod
    def format_monthly_data(monthly_dict: dict) -> list[int]:
        return [monthly_dict.get(i, 0) for i in range(1, 13)]

    @staticmethod
    def _format_top_tags_by_month(tags_data: list[dict]) -> list[TagStatsByMonthDTO]:
        """Группируем теги по месяцам"""
        from collections import defaultdict
        
        # Группируем по месяцам
        months_data = defaultdict(list)
        for tag in tags_data:
            month = tag['month']
            months_data[month].append(TagStatsDTO(
                tag=TagDTO(id=tag['id'], name=tag['name']),
                count=tag['count']
            ))
        
        # Создаем DTO для каждого месяца
        result = []
        for month in range(1, 13):
            month_tags = months_data.get(month, [])
            result.append(TagStatsByMonthDTO(
                month=month,
                tags=month_tags
            ))
        
        return result

    async def get_dashboard(self) -> DashboardDTO:
        current_year = datetime.now().year
        
        total_vacancies = await self.dashboard_repository.get_total_vacancies()
        vacancies_by_month = await self.dashboard_repository.get_vacancies_by_month(current_year)
        
        total_applications = await self.dashboard_repository.get_total_applications()
        applications_by_month = await self.dashboard_repository.get_applications_by_month(current_year)
        
        total_companies = await self.dashboard_repository.get_total_companies()
        companies_by_month = await self.dashboard_repository.get_companies_by_month(current_year)
        
        avg_closing_time = await self.dashboard_repository.get_avg_closing_time()
        closing_time_by_month = await self.dashboard_repository.get_avg_closing_time_by_month(current_year)
        
        top_tags_data = await self.dashboard_repository.get_top_tags_by_month(current_year)
        avg_salary_data = await self.dashboard_repository.get_avg_salary_by_grade()
        activities_data = await self.dashboard_repository.get_recent_activities()
        
        stuck_applications_data = await self.dashboard_repository.get_stuck_applications()
        supply_demand_data = await self.dashboard_repository.get_supply_demand_data(current_year)
            
        return DashboardDTO(
            total_active_vacancies=DashboardStatsDTO(
                current_value=total_vacancies,
                monthly_data=self.format_monthly_data(vacancies_by_month)
            ),
            total_new_applications=DashboardStatsDTO(
                current_value=total_applications,
                monthly_data=self.format_monthly_data(applications_by_month)
            ),
            companies_for_hiring=DashboardStatsDTO(
                current_value=total_companies,
                monthly_data=self.format_monthly_data(companies_by_month)
            ),
            avg_closing_time=DashboardStatsDTO(
                current_value=int(avg_closing_time),
                monthly_data=[int(closing_time_by_month.get(i, 0)) for i in range(1, 13)]
            ),
            top_tags=self._format_top_tags_by_month(top_tags_data),
            avg_salary_by_grade=[
                AvgSalaryByGradeDTO(
                    grade=salary['grade'],
                    avg_salary=int(salary['avg_salary'])
                )
                for salary in avg_salary_data
            ],
            activities=[
                ActivityDTO(
                    name=f"{activity['company_name']} опубликовал вакансию: {activity['title']}",
                )
                for activity in activities_data
            ],
            stuck_applications=[
                StuckApplicationsDTO(
                    company=CompanyActivityDTO(
                        id=stuck['company_id'],
                        name=stuck['company_name']
                    ),
                    count=stuck['count']
                )
                for stuck in stuck_applications_data
            ],
            supply_demand=[
                SupplyDemandDTO(
                    month=item['month'],
                    supply=item['supply'],
                    demand=item['demand']
                )
                for item in supply_demand_data
            ]
        )