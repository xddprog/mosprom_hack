from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, extract, and_, desc
from typing import Any
from datetime import datetime, timedelta

from backend.infrastructure.database.models.vacancy import Vacancy
from backend.infrastructure.database.models.application import Application
from backend.infrastructure.database.models.company import Company
from backend.infrastructure.database.models.tag import Tag, VacancyTag
from backend.infrastructure.database.models.student import Student
from backend.infrastructure.database.models.university import University
from backend.utils.enums import ApplicationStatus


class ResidentRatingRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_companies_with_vacancies(self) -> list[dict[str, Any]]:
        query = select(
            Company.id.label('company_id'),
            Company.name.label('company_name'),
            Company.icon_url.label('icon_url'),
            Company.industry.label('industry'),
            Company.site_url.label('site_url')
        ).join(Vacancy).distinct()
        
        result = await self.session.execute(query)
        return result.mappings().all()

    async def get_open_vacancies_count(self, company_id: int, current_month: bool = True) -> int:

        query = select(func.count(Vacancy.id))
        
        if current_month:
            current_date = datetime.now()
            query = query.where(
                and_(
                    Vacancy.company_id == company_id,
                    extract('month', Vacancy.created_at) == current_date.month,
                    extract('year', Vacancy.created_at) == current_date.year
                )
            )
        else:
            last_month = datetime.now() - timedelta(days=30)
            query = query.where(
                and_(
                    Vacancy.company_id == company_id,
                    extract('month', Vacancy.created_at) == last_month.month,
                    extract('year', Vacancy.created_at) == last_month.year
                )
            )
        
        result = await self.session.execute(query)
        return result.scalar() or 0

    async def get_viewed_applications_count(self, company_id: int, current_month: bool = True) -> int:
        query = select(func.count(Application.id))
        
        if current_month:
            current_date = datetime.now()
            query = query.join(Vacancy).where(
                and_(
                    Vacancy.company_id == company_id,
                    Application.status != ApplicationStatus.ON_REVIEW.value,
                    extract('month', Application.updated_at) == current_date.month,
                    extract('year', Application.updated_at) == current_date.year
                )
            )
        else:
            last_month = datetime.now() - timedelta(days=30)
            query = query.join(Vacancy).where(
                and_(
                    Vacancy.company_id == company_id,
                    Application.status != ApplicationStatus.ON_REVIEW.value,
                    extract('month', Application.updated_at) == last_month.month,
                    extract('year', Application.updated_at) == last_month.year
                )
            )
        
        result = await self.session.execute(query)
        return result.scalar() or 0

    async def get_screenings_count(self, company_id: int, current_month: bool = True) -> int:
        query = select(func.count(Application.id))
        
        if current_month:
            current_date = datetime.now()
            query = query.join(Vacancy).where(
                and_(
                    Vacancy.company_id == company_id,
                    Application.status == ApplicationStatus.SCREENING.value,
                    extract('month', Application.updated_at) == current_date.month,
                    extract('year', Application.updated_at) == current_date.year
                )
            )
        else:
            last_month = datetime.now() - timedelta(days=30)
            query = query.join(Vacancy).where(
                and_(
                    Vacancy.company_id == company_id,
                    Application.status == ApplicationStatus.SCREENING.value,
                    extract('month', Application.updated_at) == last_month.month,
                    extract('year', Application.updated_at) == last_month.year
                )
            )
        
        result = await self.session.execute(query)
        return result.scalar() or 0

    async def get_interviews_count(self, company_id: int, current_month: bool = True) -> int:
        query = select(func.count(Application.id))
        
        if current_month:
            current_date = datetime.now()
            query = query.join(Vacancy).where(
                and_(
                    Vacancy.company_id == company_id,
                    Application.status == ApplicationStatus.INTERVIEW.value,
                    extract('month', Application.updated_at) == current_date.month,
                    extract('year', Application.updated_at) == current_date.year
                )
            )
        else:
            last_month = datetime.now() - timedelta(days=30)
            query = query.join(Vacancy).where(
                and_(
                    Vacancy.company_id == company_id,
                    Application.status == ApplicationStatus.INTERVIEW.value,
                    extract('month', Application.updated_at) == last_month.month,
                    extract('year', Application.updated_at) == last_month.year
                )
            )
        
        result = await self.session.execute(query)
        return result.scalar() or 0

    async def get_offers_count(self, company_id: int, current_month: bool = True) -> int:
        query = select(func.count(Application.id))
        
        if current_month:
            current_date = datetime.now()
            query = query.join(Vacancy).where(
                and_(
                    Vacancy.company_id == company_id,
                    Application.status == ApplicationStatus.OFFER.value,
                    extract('month', Application.updated_at) == current_date.month,
                    extract('year', Application.updated_at) == current_date.year
                )
            )
        else:
            last_month = datetime.now() - timedelta(days=30)
            query = query.join(Vacancy).where(
                and_(
                    Vacancy.company_id == company_id,
                    Application.status == ApplicationStatus.OFFER.value,
                    extract('month', Application.updated_at) == last_month.month,
                    extract('year', Application.updated_at) == last_month.year
                )
            )
        
        result = await self.session.execute(query)
        return result.scalar() or 0

    async def get_rejections_count(self, company_id: int, current_month: bool = True) -> int:
        query = select(func.count(Application.id))
        
        if current_month:
            current_date = datetime.now()
            query = query.join(Vacancy).where(
                and_(
                    Vacancy.company_id == company_id,
                    Application.status == ApplicationStatus.REJECTED.value,
                    extract('month', Application.updated_at) == current_date.month,
                    extract('year', Application.updated_at) == current_date.year
                )
            )
        else:
            last_month = datetime.now() - timedelta(days=30)
            query = query.join(Vacancy).where(
                and_(
                    Vacancy.company_id == company_id,
                    Application.status == ApplicationStatus.REJECTED.value,
                    extract('month', Application.updated_at) == last_month.month,
                    extract('year', Application.updated_at) == last_month.year
                )
            )
        
        result = await self.session.execute(query)
        return result.scalar() or 0


    async def get_avg_applications_per_vacancy(self, company_id: int) -> float:
        vacancy_apps_subquery = (
            select(
                Vacancy.id,
                func.count(Application.id).label('app_count')
            )
            .join(Application, Application.vacancy_id == Vacancy.id)
            .where(Vacancy.company_id == company_id)
            .group_by(Vacancy.id)
            .subquery().alias('vacancy_apps')
        )
        
        query = select(
            func.avg(vacancy_apps_subquery.c.app_count).label('avg_apps')
        ).select_from(vacancy_apps_subquery)
        
        result = await self.session.execute(query)
        return float(result.scalar() or 0)

    async def get_global_avg_applications_per_vacancy(self) -> float:
        vacancy_apps_subquery = (
            select(
                Vacancy.id,
                func.count(Application.id).label('app_count')
            )
            .join(Application, Application.vacancy_id == Vacancy.id)
            .group_by(Vacancy.id)
            .subquery().alias('vacancy_apps')
        )
        
        query = select(
            func.avg(vacancy_apps_subquery.c.app_count).label('global_avg')
        ).select_from(vacancy_apps_subquery)
        
        result = await self.session.execute(query)
        return float(result.scalar() or 0)

    async def get_freshness_index(self, company_id: int) -> float:
        current_date = datetime.now()
        month_ago = current_date - timedelta(days=30)
        
        new_vacancies_query = select(func.count(Vacancy.id)).where(
            and_(
                Vacancy.company_id == company_id,
                Vacancy.created_at >= month_ago
            )
        )
        
        total_vacancies_query = select(func.count(Vacancy.id)).where(
            Vacancy.company_id == company_id
        )
        
        new_count = await self.session.execute(new_vacancies_query)
        total_count = await self.session.execute(total_vacancies_query)
        
        new_count = new_count.scalar() or 0
        total_count = total_count.scalar() or 0
        
        if total_count == 0:
            return 0.0
        
        return float(new_count) / float(total_count)

    async def get_university_applications_share(self, company_id: int) -> float:
        total_applications_query = select(func.count(Application.id)).join(Vacancy).where(
            Vacancy.company_id == company_id
        )
        
        university_applications_query = select(func.count(Application.id)).join(
            Vacancy
        ).join(Student, Application.student_id == Student.id).join(
            University, Student.university_id == University.id
        ).where(Vacancy.company_id == company_id)
        
        total_count = await self.session.execute(total_applications_query)
        university_count = await self.session.execute(university_applications_query)
        
        total_count = total_count.scalar() or 0
        university_count = university_count.scalar() or 0
        
        if total_count == 0:
            return 0.0
        
        return float(university_count) / float(total_count)

    async def get_top_tags_last_month(self, company_id: int, limit: int = 10) -> list[dict[str, Any]]:
        current_date = datetime.now()
        
        # Сначала пробуем найти теги за последние 3 месяца
        three_months_ago = current_date - timedelta(days=90)
        
        query = (
            select(
                Tag.id,
                Tag.name,
                func.count(VacancyTag.vacancy_id).label('count')
            )
            .join(VacancyTag)
            .join(Vacancy)
            .where(
                Vacancy.company_id == company_id,
                Vacancy.created_at >= three_months_ago
            )
            .group_by(Tag.id, Tag.name)
            .order_by(func.count(VacancyTag.vacancy_id).desc())
            .limit(limit)
        )
        
        result = await self.session.execute(query)
        return result.unique().mappings().all()

    async def get_hot_vacancy(self, company_id: int) -> dict[str, Any] | None:
        query = select(
            Vacancy.id,
            Vacancy.title,
            (func.extract('epoch', func.now() - Vacancy.created_at) / 86400).label('days_open')
        ).where(
            Vacancy.company_id == company_id
        ).order_by(desc('days_open')).limit(1)
        
        result = await self.session.execute(query)
        row = result.first()
        
        if row:
            return {
                'id': row.id,
                'title': row.title,
                'days_open': int(row.days_open)
            }
        return None

    async def get_vacancy_grade_distribution(self, company_id: int) -> list[dict[str, Any]]:
        total_query = select(func.count(Vacancy.id)).where(Vacancy.company_id == company_id)
        total_result = await self.session.execute(total_query)
        total_vacancies = total_result.scalar() or 0
        
        if total_vacancies == 0:
            return []
        
        query = select(
            Vacancy.experience.label('grade'),
            func.count(Vacancy.id).label('count'),
            func.avg((Vacancy.min_salary + Vacancy.max_salary) / 2).label('avg_salary')
        ).where(Vacancy.company_id == company_id).group_by(Vacancy.experience)
        
        result = await self.session.execute(query)
        distribution = []
        
        for row in result:
            distribution.append({
                'grade': row.grade,
                'count': row.count,
                'avg_salary': row.avg_salary
            })
        
        return distribution

    async def get_vacancy_work_format_distribution(self, company_id: int) -> list[dict[str, Any]]:
        query = select(
            Vacancy.work_format.label('work_format'),
            func.count(Vacancy.id).label('count')
        ).where(Vacancy.company_id == company_id).group_by(Vacancy.work_format)
        
        result = await self.session.execute(query)
        distribution = []
        
        for row in result:
            distribution.append({
                'work_format': row.work_format,
                'count': row.count
            })
        
        return distribution
 