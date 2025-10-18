from dishka import FromDishka
from dishka.integrations.fastapi import inject
from fastapi import APIRouter, Depends
from typing import Annotated

from backend.api.dependency.providers.request import COMPANY_PROTECTED
from backend.core.dto.application import CollectiveApplicationBookingDTO, CreateCollectiveApplicationBookingDTO
from backend.core.dto.user_dto import BaseUserModel
from backend.core.services.application_service import ApplicationService
from fastapi import APIRouter


router = APIRouter()


@router.post("/collective/send-booking")
@inject
async def send_booking_to_company(
    service: FromDishka[ApplicationService],
    user: Annotated[BaseUserModel, Depends(COMPANY_PROTECTED)],
    collective_application_id: int,
    data: CreateCollectiveApplicationBookingDTO
) -> CollectiveApplicationBookingDTO:
    return await service.create_collective_application_booking(user.company_id, collective_application_id, data)    