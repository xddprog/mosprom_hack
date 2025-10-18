from uuid import uuid4
from backend.core.dto.student_dto import StudentCreateDTO, StudentDTO, StudentUpdateDTO
from backend.core.repositories.student_repository import StudentRepository
from backend.infrastructure.database.models.student import Student
from backend.core.clients.aws_client import AWSClient
from backend.infrastructure.errors.students import StudentNotFoundError


class StudentService:
    def __init__(self, student_repository: StudentRepository, aws_client: AWSClient):
        self.student_repository = student_repository
        self.aws_client = aws_client

    async def create_student(self, university_id: int, data: StudentCreateDTO) -> StudentDTO:
        if data.resume:
            data.resume = await self.aws_client.upload_one_file(data.resume, f"resumes/{uuid4()}")
        
        student = await self.student_repository.add_item(
            **data.model_dump(exclude={"resume"}),
            university_id=university_id,
            resume_link=data.resume,
        )
        return StudentDTO.model_validate(student, from_attributes=True)  

    async def update_student(self, student_id: int, data: StudentUpdateDTO) -> StudentDTO:
        if data.resume:
            data.resume = await self.aws_client.upload_one_file(data.resume, f"resumes/{uuid4()}")

        student = await self.student_repository.update_item(student_id, **data.model_dump(exclude_unset=True))

        if not student:
            raise StudentNotFoundError()
        return StudentDTO.model_validate(student, from_attributes=True)

    async def delete_student(self, student_id: int) -> None:
        student = await self.student_repository.get_item(student_id)
        if not student:
            raise StudentNotFoundError()
        await self.student_repository.delete_item(student)

    async def get_students(
        self, 
        university_id: int, 
        faculty: str | None = None, 
        course_number: int | None = None, 
        tag_ids: list[int] | None = None
    ) -> list[StudentDTO]:
        students = await self.student_repository.get_all(
            university_id=university_id, 
            faculty=faculty, 
            course_number=course_number, 
            tag_ids=tag_ids
        )
        return [StudentDTO.model_validate(student, from_attributes=True) for student in students]

    async def check_students_exists(self, student_ids: list[int], university_id: int) -> list[Student]:
        students = await self.student_repository.get_by_ids(
            university_id=university_id,
            student_ids=student_ids
        )

        found_student_ids = {student.id for student in students}
        missing_student_ids = set(student_ids) - found_student_ids
        
        if missing_student_ids:
            raise StudentNotFoundError()
        
        return students