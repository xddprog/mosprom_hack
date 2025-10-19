from typing import Annotated
from fastapi import APIRouter, Depends
from dishka import FromDishka
from dishka.integrations.fastapi import inject


from backend.api.dependency.providers.request import ADMIN_PROTECTED
from backend.core.dto.dashboard import DashboardDTO, ResidentRatingDTO
from backend.core.dto.user_dto import BaseUserModel
from backend.core.services.dashboard_service import DashboardService
from backend.core.services.resident_rating_service import ResidentRatingService

router = APIRouter()


@router.get("/")
@inject
async def get_dashboard(
    service: FromDishka[DashboardService],
    # user: Annotated[BaseUserModel, Depends(ADMIN_PROTECTED)]
) -> DashboardDTO:
    return await service.get_dashboard()


@router.get("/residents-rating")
@inject
async def get_residents_rating(
    service: FromDishka[ResidentRatingService],
    # user: Annotated[BaseUserModel, Depends(ADMIN_PROTECTED)]
) -> list[ResidentRatingDTO]:
    """Получить рейтинг резидентов (компаний)"""
    return await service.get_residents_rating()