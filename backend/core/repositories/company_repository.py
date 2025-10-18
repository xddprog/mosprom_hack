from sqlalchemy import func, select
from sqlalchemy.orm import selectinload
from backend.core.repositories.base import SqlAlchemyRepository
from backend.infrastructure.database.models.application import Application
from backend.infrastructure.database.models.company import Company
from backend.infrastructure.database.models.student import Student
from backend.infrastructure.database.models.vacancy import Vacancy


class CompanyRepository(SqlAlchemyRepository[Company]):
    def __init__(self, session):
        super().__init__(session, Company)

    async def get_all(self, name: str | None = None) -> list[Company]:
        query = select(self.model)
        if name:
            query = query.where(Company.name.ilike(f"%{name}%"))
        result = await self.session.execute(query)
        return result.scalars().all()
