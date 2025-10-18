from aiohttp.web_app import Application
from dishka import FromDishka
from dishka.integrations.fastapi import inject
from fastapi import APIRouter, Depends, Form, Query

from backend.core.dto.application import ApplicationCreateDTO
from backend.core.dto.vacancy_dto import VacancyFilters, VacancyFromCompanyDTO, VacancyPublicDTO
from backend.core.services.application_service import ApplicationService
from backend.core.services.vacancy_service import VacancyService
from backend.utils.enums import ExperienceLevel, WorkFormat


router = APIRouter()


@router.get("/")
@inject
async def get_vacancies(
    vacancy_service: FromDishka[VacancyService],
    limit: int = 20,
    offset: int = 0,
    region: str | None = None,
    experiences: list[ExperienceLevel] = Query(None), 
    min_salary: int | None = None,
    max_salary: int | None = None,
    tags: list[int] = Query(None),
    work_formats: list[str]  = Query(None),
    is_internship: bool = False,
) -> list[VacancyPublicDTO]:
    return await vacancy_service.get_vacancies(
        VacancyFilters(
            limit=limit,
            offset=offset,
            region=region,
            experiences=experiences,
            min_salary=min_salary,
            max_salary=max_salary,
            tags=tags,
            work_formats=work_formats,
            is_internship=is_internship,
        )
    )

   
@router.post("/{vacancy_id}/apply", response_model=VacancyPublicDTO)
@inject
async def create_application_for_vacancy(
    vacancy_id: int,
    vacancy_service: FromDishka[VacancyService],
    application_service: FromDishka[ApplicationService],
    form: ApplicationCreateDTO = Form(),
) -> VacancyPublicDTO:
    await vacancy_service.check_vacancy_exists(vacancy_id)
    return await application_service.create_application(form, vacancy_id)