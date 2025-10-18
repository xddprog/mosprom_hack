from pydantic import BaseModel
from backend.core.dto.university_dto import UniversityDTO


class StudentDTO(BaseModel):
    id: int
    full_name: str
    email: str
    phone_number: str | None
    resume_link: str | None
    university_id: int | None
    