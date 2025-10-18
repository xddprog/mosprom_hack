from sqlalchemy import select
from backend.core.repositories.base import SqlAlchemyRepository
from backend.infrastructure.database.models.university import University


class UniversityRepository(SqlAlchemyRepository[University]):
    def __init__(self, session):
        super().__init__(session, University)

    async def get_all(self, name: str | None = None, limit: int | None = None, offset: int | None = None) -> list[University]:
        query = select(self.model)
        if name:
            query = query.where(University.name.ilike(f"%{name}%"))
        query = query.limit(limit).offset(offset)
        result = await self.session.execute(query)
        return result.scalars().all()

    async def get_by_name(self, name: str) -> University | None:
        query = select(self.model).where(University.name == name)
        result = await self.session.execute(query)
        return result.scalar_one_or_none()

    async def get_by_email(self, email: str) -> University | None:
        query = select(self.model).where(University.email == email)
        result = await self.session.execute(query)
        return result.scalar_one_or_none()
