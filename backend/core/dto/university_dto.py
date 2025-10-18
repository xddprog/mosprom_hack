from pydantic import BaseModel


class UniversityDTO(BaseModel):
    id: int
    name: str