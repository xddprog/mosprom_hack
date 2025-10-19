from fastapi import Query
from pydantic import BaseModel

from backend.core.dto.company_dto import CompanyDTO
from backend.utils.enums import ExperienceLevel, WorkFormat


class TagDTO(BaseModel):
    id: int
    name: str


class VacancyActivityDTO(BaseModel):
    id: int
    name: str
    

class VacancyBaseDTO(BaseModel):
    title: str
    min_salary: int
    max_salary: int
    experience: ExperienceLevel
    region: str
    tags: list[TagDTO] = []
    work_format: WorkFormat
    responsibilities: list[str]
    requirements: list[str]
    conditions: list[str]
    is_internship: bool


class VacancyCreateDTO(VacancyBaseDTO):
    tags: list[int] = []


class VacancyUpdateDTO(VacancyBaseDTO):
    title: str | None = None
    min_salary: int | None = None
    max_salary: int | None = None
    experience: ExperienceLevel | None = None
    region: str | None = None
    tags: list[int] = []
    work_format: WorkFormat | None = None
    responsibilities: list[str] = []
    requirements: list[str] = []
    conditions: list[str] = []
    

class VacancyPublicDTO(VacancyBaseDTO):
    id: int
    company: CompanyDTO
    tags: list[TagDTO] = []


class VacancyFromCompanyDTO(VacancyCreateDTO):
    id: int
    tags: list[TagDTO]
    

class VacancyFilters(BaseModel):
    company_id: int | None = None
    region: str | None = None
    experiences: list[ExperienceLevel] | None = Query(None)
    min_salary: int | None = None
    max_salary: int | None = None
    tags: list[int] | None = Query(None)
    work_formats: list[WorkFormat] | None = Query(None) 
    is_internship: bool = False
    limit: int = 20
    offset: int = 0