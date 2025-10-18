
from fastapi import Form, UploadFile
from pydantic import BaseModel, Field

from backend.core.dto.student_dto import StudentDTO
from backend.core.dto.university_dto import UniversityDTO
from backend.utils.enums import CollectiveApplicationStatus


class CompanyDTO(BaseModel):
    id: int
    name: str
    icon_url: str | None
    site_url: str | None
    industry: str | None
    

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


class CreateCollectiveApplicationDTO(BaseModel):
    course_number: int
    faculty: str
    student_count: int
    desired_period: str
    comment: str | None


class CreateCollectiveApplicationBookingDTO(BaseModel):
    collective_application_id: int
    company_id: int
    booked_count: int
    comment: str | None


class UpdateCollectiveApplicationDTO(BaseModel):
    course_number: int | None
    faculty: str | None
    student_count: int | None
    desired_period: str | None
    comment: str | None
    status: CollectiveApplicationStatus | None
    

class CollectiveApplicationDTO(CreateCollectiveApplicationDTO):
    id: int
    status: CollectiveApplicationStatus
    

class CollectiveApplicationBookingDTO(CreateCollectiveApplicationBookingDTO):
    id: int
    company: CompanyDTO | None = None


class CollectiveApplicationWithBookingsDTO(CollectiveApplicationDTO):
    bookings: list[CollectiveApplicationBookingDTO] = []
    