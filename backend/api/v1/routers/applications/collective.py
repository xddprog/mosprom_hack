from dishka import FromDishka
from dishka.integrations.fastapi import inject
from fastapi import APIRouter, Depends
from typing import Annotated

from backend.api.dependency.providers.request import COMPANY_PROTECTED, UNIVERSITY_PROTECTED
from backend.core.dto.application import CollectiveApplicationDTO
from backend.core.dto.user_dto import BaseUserModel
from backend.core.services.collective_application_service import CollectiveApplicationService
from fastapi import APIRouter


router = APIRouter()


@router.get("/")    
@inject
async def get_collective_applications(
    service: FromDishka[CollectiveApplicationService],
    user: Annotated[BaseUserModel, Depends(COMPANY_PROTECTED)],
    limit: int = 20,
    offset: int = 0,
) -> list[CollectiveApplicationDTO]:
    return await service.get_all_collective_applications(limit, offset)