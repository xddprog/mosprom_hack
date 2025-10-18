from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from backend.core.dto.vacancy_dto import VacancyFilters
from backend.core.repositories.base import SqlAlchemyRepository
from backend.infrastructure.database.models.tag import Tag
from backend.infrastructure.database.models.vacancy import Vacancy
from backend.utils.enums import ExperienceLevel

class VacancyRepository(SqlAlchemyRepository[Vacancy]):
    def __init__(self, session: AsyncSession):
        super().__init__(session, Vacancy)

    async def get_all(
        self, 
        limit: int | None = None, 
        offset: int | None = None,
        region: str | None = None,
        experiences: list[ExperienceLevel] | None = None,
        min_salary: int | None = None,
        max_salary: int | None = None,
        tags: list[int] | None = None,
        work_formats: list[str] | None = None,
        company_id: int | None = None,
        is_internship: bool | None = None
    ) -> list[Vacancy]:
        query = select(Vacancy).options(selectinload(Vacancy.company))
        
        if region:
            query = query.where(Vacancy.region.icontains(region))
        if experiences:
            query = query.where(Vacancy.experience.in_(experiences))
        if min_salary:
            query = query.where(Vacancy.min_salary >= min_salary)
        if max_salary:
            query = query.where(Vacancy.max_salary <= max_salary)
        if work_formats:
            query = query.where(Vacancy.work_format.in_(work_formats))
        if tags:
            query = query.join(Vacancy.tags).where(Tag.id.in_(tags)).group_by(Vacancy.id)
        if company_id:
            query = query.where(Vacancy.company_id == company_id)
        if is_internship:
            query = query.where(Vacancy.is_internship == is_internship)
        result = await self.session.execute(query.limit(limit).offset(offset))
        return result.scalars().all()
    
    async def get_full_vacancy(self, vacancy_id: int) -> Vacancy | None:
        query = (
            select(Vacancy)
            .options(
                selectinload(Vacancy.tags),
                selectinload(Vacancy.applications),
                selectinload(Vacancy.group_applications),
            )
            .where(Vacancy.id == vacancy_id)
        )
        result = await self.session.execute(query)
        return result.scalars().first()
