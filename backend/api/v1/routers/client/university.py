from fastapi import APIRouter

from backend.core.dto.university_dto import UniversityDTO
from backend.core.services.university_service import UniversityService
from dishka import FromDishka
from dishka.integrations.fastapi import inject


router = APIRouter()


@router.get("/", response_model=list[UniversityDTO])
@inject
async def get_universities(
    service: FromDishka[UniversityService],
    name: str | None = None,
) -> list[UniversityDTO]:
    return await service.get_universities(name)