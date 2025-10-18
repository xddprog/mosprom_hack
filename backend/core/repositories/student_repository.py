from sqlalchemy import select, func
from sqlalchemy.orm import selectinload
from backend.core.repositories.base import SqlAlchemyRepository
from backend.infrastructure.database.models.student import Student
from backend.infrastructure.database.models.tag import Tag


class StudentRepository(SqlAlchemyRepository[Student]):
    def __init__(self, session):
        super().__init__(session, Student)

    async def get_all(
        self, 
        university_id: int, 
        faculty: str | None = None, 
        course_number: int | None = None, 
        tag_ids: list[int] | None = None
    ) -> list[Student]:
        query = select(Student).where(Student.university_id == university_id)
        if faculty:
            query = query.where(Student.faculty.ilike(f"%{faculty}%"))
        if course_number:
            query = query.where(Student.course_number == course_number)
        if tag_ids:
            query = query.join(Student.tags).where(Tag.id.in_(tag_ids))
        result = await self.session.execute(query)
        return result.scalars().all()

    async def get_by_ids(self, university_id: int, student_ids: list[int]) -> list[Student]:
        query = (
            select(Student)
            .where(Student.university_id == university_id)
            .where(Student.id.in_(student_ids))
        )
        result = await self.session.execute(query)
        return result.scalars().all()