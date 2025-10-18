from dishka import FromDishka
from dishka.integrations.fastapi import inject
from fastapi import APIRouter

from backend.core.dto.vacancy_dto import TagDTO
from backend.core.services.tag_service import TagService


router = APIRouter()


@router.get("/")
@inject
async def get_tags(
    tag_service: FromDishka[TagService],
    name: str | None = None,
) -> list[TagDTO]:
    return await tag_service.get_all(name=name)