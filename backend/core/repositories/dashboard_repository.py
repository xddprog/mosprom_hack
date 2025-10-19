from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, extract, and_, case
from typing import Any

from backend.infrastructure.database.models.vacancy import Vacancy
from backend.infrastructure.database.models.application import Application
from backend.infrastructure.database.models.company import Company
from backend.infrastructure.database.models.tag import Tag, VacancyTag
from backend.utils.enums import ApplicationStatus
from backend.infrastructure.database.models.user import User


class DashboardRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_total_vacancies(self) -> int:
        query = select(func.count(Vacancy.id))
        result = await self.session.execute(query)
        return result.scalar() or 0

    async def get_vacancies_by_month(self, year: int) -> dict[int, int]:
        query = select(
            extract('month', Vacancy.created_at).label('month'),
            func.count(Vacancy.id).label('count')
        ).where(
            extract('year', Vacancy.created_at) == year
        ).group_by(extract('month', Vacancy.created_at))
        
        result = await self.session.execute(query)
        return {row.month: row.count for row in result}

    async def get_total_applications(self) -> int:
        query = select(func.count(Application.id))
        result = await self.session.execute(query)
        return result.scalar() or 0

    async def get_applications_by_month(self, year: int) -> dict[int, int]:
        query = select(
            extract('month', Application.created_at).label('month'),
            func.count(Application.id).label('count')
        ).where(
            extract('year', Application.created_at) == year
        ).group_by(extract('month', Application.created_at))
        
        result = await self.session.execute(query)
        return {row.month: row.count for row in result}

    async def get_total_companies(self) -> int:
        query = select(func.count(Company.id))
        result = await self.session.execute(query)
        return result.scalar() or 0

    async def get_companies_by_month(self, year: int) -> dict[int, int]:
        query = select(
            extract('month', Company.created_at).label('month'),
            func.count(Company.id).label('count')
        ).where(
            extract('year', Company.created_at) == year
        ).group_by(extract('month', Company.created_at))
        
        result = await self.session.execute(query)
        return {row.month: row.count for row in result}

    async def get_avg_closing_time(self) -> float:
        query = select(
            func.avg(
                func.extract('epoch', Application.updated_at - Application.created_at) / 86400
            )
        ).where(Application.status == ApplicationStatus.REJECTED.value)
        
        result = await self.session.execute(query)
        return result.scalar() or 0.0

    async def get_avg_closing_time_by_month(self, year: int) -> dict[int, float]:
        query = select(
            extract('month', Application.updated_at).label('month'),
            func.avg(
                func.extract('epoch', Application.updated_at - Application.created_at) / 86400
            ).label('avg_days')
        ).where(
            and_(
                Application.status == ApplicationStatus.REJECTED.value,
                extract('year', Application.updated_at) == year
            )
        ).group_by(extract('month', Application.updated_at))
        
        result = await self.session.execute(query)
        return {row.month: float(row.avg_days or 0) for row in result}

    async def get_top_tags(self, limit: int = 4) -> list[dict[str, Any]]:
        query = select(
            Tag.id,
            Tag.name,
            func.count(VacancyTag.vacancy_id).label('count')
        ).join(VacancyTag).group_by(Tag.id, Tag.name).order_by(
            func.count(VacancyTag.vacancy_id).desc()
        ).limit(limit)
        
        result = await self.session.execute(query)
        return result.mappings().all()

    async def get_top_tags_by_month(self, year: int, limit: int = 3) -> list[dict[str, Any]]:
        # Подзапрос для получения тегов с нумерацией по месяцам
        subquery = (
            select(
                Tag.id,
                Tag.name,
                extract('month', Vacancy.created_at).label('month'),
                func.count(VacancyTag.vacancy_id).label('count'),
                func.row_number().over(
                    partition_by=extract('month', Vacancy.created_at),
                    order_by=func.count(VacancyTag.vacancy_id).desc()
                ).label('row_num')
            )
            .join(VacancyTag)
            .join(Vacancy)
            .where(extract('year', Vacancy.created_at) == year)
            .group_by(Tag.id, Tag.name, extract('month', Vacancy.created_at))
            .select_from(Tag)
            .subquery()
        )
        
        # Основной запрос с ограничением по row_num
        query = (
            select(
                subquery.c.id,
                subquery.c.name,
                subquery.c.month,
                subquery.c.count
            )
            .where(subquery.c.row_num <= limit)
            .order_by(subquery.c.month, subquery.c.count.desc())
        )
        
        result = await self.session.execute(query)
        return result.mappings().all()

    async def get_avg_salary_by_grade(self) -> list[dict[str, Any]]:
        query = select(
            Vacancy.experience.label('grade'),
            func.avg((Vacancy.min_salary + Vacancy.max_salary) / 2).label('avg_salary')
        ).where(
            and_(
                Vacancy.min_salary.isnot(None),
                Vacancy.max_salary.isnot(None)
            )
        ).group_by(Vacancy.experience)
        
        result = await self.session.execute(query)
        return result.mappings().all()

    async def get_recent_activities(self, limit: int = 10) -> list[dict[str, Any]]:
        query = select(
            Vacancy.id,
            Vacancy.title,
            Vacancy.created_at,
            Company.id.label('company_id'),
            Company.name.label('company_name')
        ).join(Company).order_by(Vacancy.created_at.desc()).limit(limit)
        
        result = await self.session.execute(query)
        return result.mappings().all()

    async def get_stuck_applications(self, limit: int = 10) -> list[dict[str, Any]]:
        query = (
            select(
                Company.id.label('company_id'),
                Company.name.label('company_name'),
                func.count(Application.id).label('count')
            )
            .join(Vacancy, Vacancy.company_id == Company.id)
            .join(Application, Application.vacancy_id == Vacancy.id)
            .where(Application.status == ApplicationStatus.ON_REVIEW.value)
            .group_by(Company.id, Company.name)
            .order_by(func.count(Application.id).desc())
            .limit(limit)
        )
        
        result = await self.session.execute(query)
        return result.mappings().all()

    async def get_supply_demand_data(self, year: int) -> list[dict[str, Any]]:
        """Получить данные спроса и предложения по месяцам за год"""
        # Получаем данные по вакансиям (предложение)
        vacancies_query = select(
            extract('month', Vacancy.created_at).label('month'),
            func.count(Vacancy.id).label('supply')
        ).where(
            extract('year', Vacancy.created_at) == year
        ).group_by(extract('month', Vacancy.created_at))
        
        vacancies_result = await self.session.execute(vacancies_query)
        vacancies_data = {row.month: row.supply for row in vacancies_result}
        
        # Получаем данные по заявкам (спрос)
        applications_query = select(
            extract('month', Application.created_at).label('month'),
            func.count(Application.id).label('demand')
        ).where(
            extract('year', Application.created_at) == year
        ).group_by(extract('month', Application.created_at))
        
        applications_result = await self.session.execute(applications_query)
        applications_data = {row.month: row.demand for row in applications_result}
        
        # Формируем данные для всех 12 месяцев
        supply_demand_data = []
        for month in range(1, 13):
            supply_demand_data.append({
                'month': month,
                'supply': vacancies_data.get(month, 0),
                'demand': applications_data.get(month, 0)
            })
        
        return supply_demand_data
