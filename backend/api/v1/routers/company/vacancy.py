from typing import Annotated
from fastapi import APIRouter, Depends, Query
from dishka import FromDishka
from dishka.integrations.fastapi import inject 
from backend.api.dependency.providers.request import COMPANY_PROTECTED
from backend.core.dto.user_dto import BaseUserModel
from backend.core.dto.vacancy_dto import VacancyCreateDTO, VacancyFilters, VacancyFromCompanyDTO, VacancyUpdateDTO
from backend.core.services.tag_service import TagService
from backend.core.services.vacancy_service import VacancyService
from backend.utils.enums import ExperienceLevel, WorkFormat


router = APIRouter()


@router.post("/vacancy")
@inject
async def create_vacancy(
    data: VacancyCreateDTO,
    vacancy_service: FromDishka[VacancyService],
    tag_service: FromDishka[TagService],
    user = Depends(COMPANY_PROTECTED)
) -> VacancyFromCompanyDTO:
    if data.tags:
        data.tags = await tag_service.get_tags(data.tags)
    return await vacancy_service.create_vacancy(user.company_id, data)


@router.get("/{company_id}/vacancy")
@inject 
async def get_vacancies(
    service: FromDishka[VacancyService],
    company_id: int | None = None,
    is_internship: bool = False,
    limit: int = 20,
    offset: int = 0,
    region: str | None = None,
    experiences: list[ExperienceLevel] | None = Query(None),
    min_salary: int | None = None,
    max_salary: int | None = None,
    tags: list[int] | None = Query(None),
    work_formats: list[WorkFormat] | None = Query(None),
) -> list[VacancyFromCompanyDTO]:
    return await service.get_vacancies_from_company(
        VacancyFilters(
            is_internship=is_internship,
            limit=limit,
            offset=offset,
            company_id=company_id,
            region=region,
            experiences=experiences,
            min_salary=min_salary,
            max_salary=max_salary,
            tags=tags,
            work_formats=work_formats,
        )
    )


@router.delete("/vacancy/{vacancy_id}")
@inject
async def delete_vacancy(
    service: FromDishka[VacancyService],
    user: Annotated[BaseUserModel, Depends(COMPANY_PROTECTED)],
    vacancy_id: int
) -> None:
    return await service.delete_vacancy(vacancy_id, user.company_id)
    

@router.put("/vacancy/{vacancy_id}")
@inject
async def update_vacancy(
    vacancy_id: int,
    data: VacancyUpdateDTO,
    service: FromDishka[VacancyService],
    tag_service: FromDishka[TagService],
    user = Depends(COMPANY_PROTECTED)
) -> VacancyFromCompanyDTO:
    if data.tags:
        data.tags = await tag_service.get_tags(data.tags)
    return await service.update_vacancy(vacancy_id, data, user.company_id)
