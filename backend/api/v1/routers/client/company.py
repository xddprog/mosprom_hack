from dishka import FromDishka
from dishka.integrations.fastapi import inject
from fastapi import APIRouter

from backend.core.dto.company_dto import CompanyDTO
from backend.core.services.company_service import CompanyService


router = APIRouter()


@router.get("/")
@inject
async def get_companies(
    service: FromDishka[CompanyService],
    name: str | None = None,
) -> list[CompanyDTO]:
    return await service.get_all(name=name)
