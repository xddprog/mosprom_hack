from fastapi import Form, UploadFile
from pydantic import BaseModel, Field

from backend.core.dto.student_dto import StudentDTO
from backend.core.dto.university_dto import UniversityDTO


class ApplicationCreateDTO(BaseModel):
    full_name: str = Form()
    email: str = Form()
    resume: UploadFile = Form()


class ApplicationsCreateByUniversityDTO(BaseModel):
    vacancy_id: int
    student_ids: list[int] = Field(..., min_length=1)


class CandidateCardDTO(BaseModel):
    id: int
    full_name: str | None
    email: str | None
    resume_link: str | None
    student: StudentDTO | None
    university: UniversityDTO | None