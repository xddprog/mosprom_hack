from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from backend.core.repositories.base import SqlAlchemyRepository
from backend.infrastructure.database.models.tag import Tag
import random

class TagRepository(SqlAlchemyRepository[Tag]):
    def __init__(self, session: AsyncSession):
        super().__init__(session, Tag)

    async def get_by_ids(self, tag_ids: list[int]) -> list[Tag]:
        result = await self.session.execute(
            select(Tag).where(Tag.id.in_(tag_ids))
        )
        return result.scalars().all()
    
    async def get_all(self, name: str | None = None) -> list[Tag]:
        query = select(Tag)
        if name:
            query = query.where(Tag.name.icontains(name))
        result = await self.session.execute(query)
        return result.scalars().all()