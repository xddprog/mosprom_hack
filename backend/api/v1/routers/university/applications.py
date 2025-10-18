from dishka import FromDishka
from dishka.integrations.fastapi import inject
from fastapi import APIRouter, Depends
from typing import Annotated

from backend.api.dependency.providers.request import UNIVERSITY_PROTECTED
from backend.core.dto.application import CollectiveApplicationDTO, CollectiveApplicationWithBookingsDTO, UpdateCollectiveApplicationDTO
from backend.core.dto.user_dto import BaseUserModel
from backend.core.services.collective_application_service import CollectiveApplicationService

router = APIRouter()




@router.get("/collective")
@inject
async def get_collective_applications(
    service: FromDishka[CollectiveApplicationService],
    user: Annotated[BaseUserModel, Depends(UNIVERSITY_PROTECTED)],
    limit: int = 20,
    offset: int = 0,
) -> list[CollectiveApplicationDTO]:
    return await service.get_all_collective_applications(user.university_id, limit, offset)


@router.get("/collective/{collective_application_id}")
@inject
async def get_collective_application_by_id(
    service: FromDishka[CollectiveApplicationService],
    user: Annotated[BaseUserModel, Depends(UNIVERSITY_PROTECTED)],
    collective_application_id: int,
) -> CollectiveApplicationWithBookingsDTO:
    return await service.get_collective_application_by_id(collective_application_id)


@router.put("/collective/{collective_application_id}")
@inject
async def update_collective_application(
    service: FromDishka[CollectiveApplicationService],
    user: Annotated[BaseUserModel, Depends(UNIVERSITY_PROTECTED)],
    collective_application_id: int,
    data: UpdateCollectiveApplicationDTO
) -> CollectiveApplicationDTO:
    return await service.update_collective_application(collective_application_id, data)


@router.delete("/collective/{collective_application_id}")
@inject
async def delete_collective_application(
    service: FromDishka[CollectiveApplicationService],
    user: Annotated[BaseUserModel, Depends(UNIVERSITY_PROTECTED)],
    collective_application_id: int,
) -> None:
    await service.delete_collective_application(collective_application_id)