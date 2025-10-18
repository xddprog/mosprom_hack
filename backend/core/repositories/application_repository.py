from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from backend.core.repositories.base import SqlAlchemyRepository
from backend.infrastructure.database.models.application import Application
from backend.infrastructure.database.models.student import Student
from backend.infrastructure.database.models.vacancy import Vacancy


class ApplicationRepository(SqlAlchemyRepository):
    def __init__(self, session: AsyncSession):
        super().__init__(session, Application)

    async def get_kanban(self, company_id: int) -> list[Application] | None:
        query = (
            select(Application)
            .join(Vacancy, Vacancy.id == Application.vacancy_id)
            .where(Vacancy.company_id == company_id)
            .options(
                selectinload(Application.student).selectinload(Student.university),
                selectinload(Application.university)
            )
            .order_by(Application.status, Application.created_at.desc())
        )
        result = await self.session.execute(query)
        return result.scalars().all()