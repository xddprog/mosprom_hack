
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from backend.core.repositories.base import SqlAlchemyRepository
from backend.infrastructure.database.models.collective_application import CollectiveApplication, CollectiveApplicationBooking


class CollectiveApplicationRepository(SqlAlchemyRepository[CollectiveApplication]):
    def __init__(self, session):
        super().__init__(session, CollectiveApplication)

    async def get_with_bookings(self, collective_application_id: int) -> CollectiveApplication:
        query = (
            select(CollectiveApplication)
            .options(selectinload(CollectiveApplication.bookings).selectinload(CollectiveApplicationBooking.company))
            .where(CollectiveApplication.id == collective_application_id)
        )
        result = await self.session.execute(query)
        return result.scalar_one_or_none()

    async def get_all(self, limit: int | None = None, offset: int | None = None) -> list[CollectiveApplication]:
        query = select(CollectiveApplication)
        if limit:
            query = query.limit(limit)
        if offset:
            query = query.offset(offset)
        result = await self.session.execute(query)
        return result.scalars().all()