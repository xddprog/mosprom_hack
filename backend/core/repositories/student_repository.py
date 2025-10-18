from sqlalchemy import select, func
from sqlalchemy.orm import selectinload
from backend.core.repositories.base import SqlAlchemyRepository
from backend.infrastructure.database.models.student import Student


class StudentRepository(SqlAlchemyRepository[Student]):
    def __init__(self, session):
        super().__init__(session, Student)
