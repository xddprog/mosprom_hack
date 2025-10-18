from uuid import uuid4
from typing import Optional
from backend.core.dto.student_dto import (
    StudentDTO, StudentCreateDTO, StudentUpdateDTO, StudentListDTO,
    CollectiveApplicationCreateDTO, CollectiveApplicationDTO,
    StudentSubmissionDTO, StudentSubmissionResponseDTO
)
from backend.core.repositories.student_repository import StudentRepository
from backend.infrastructure.database.models.student import Student
from backend.infrastructure.database.models.application import Application
from backend.infrastructure.database.models.vacancy import Vacancy
from backend.infrastructure.errors.university_errors import UniversityNotFound
from backend.core.clients.aws_client import AWSClient
from backend.utils.enums import ApplicationStatus


class StudentService:
    def __init__(self, student_repository: StudentRepository, aws_client: AWSClient):
        self.student_repository = student_repository
        self.aws_client = aws_client
