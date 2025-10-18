from typing import Annotated
from dishka import FromDishka
from dishka.integrations.fastapi import inject
from fastapi import APIRouter, Depends

from backend.api.dependency.providers.request import COMPANY_PROTECTED
from backend.core.dto.company_dto import CompanyUpdateDTO
from backend.core.dto.user_dto import BaseUserModel
from backend.core.services.application_service import ApplicationService
from backend.core.services.company_service import CompanyService
from backend.core.services.vacancy_service import VacancyService
from backend.utils.enums import ApplicationStatus


router = APIRouter()


@router.get("/")
@inject
async def get_company(
    service: FromDishka[CompanyService],
    user: Annotated[BaseUserModel, Depends(COMPANY_PROTECTED)]
):
    return await service.get_company(user.company_id)


@router.put("/")
@inject
async def update_company(
    service: FromDishka[CompanyService],
    user: Annotated[BaseUserModel, Depends(COMPANY_PROTECTED)],
    data: CompanyUpdateDTO = Depends()
):
    return await service.update_company(user.company_id, data)


@router.get("/kanban")
@inject
async def get_company_kanban(
    service: FromDishka[ApplicationService],
    user: Annotated[BaseUserModel, Depends(COMPANY_PROTECTED)]
):
    return await service.get_kanban(user.company_id)


@router.patch("/kanban/{application_id}/status/{new_status}")
@inject
async def update_application_status(
    service: FromDishka[ApplicationService],
    user: Annotated[BaseUserModel, Depends(COMPANY_PROTECTED)],
    application_id: int,
    new_status: ApplicationStatus
):
    return await service.update_application_status(application_id, new_status, user.company_id)