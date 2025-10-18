from fastapi import APIRouter

from backend.api.v1.routers.client.vacancy import router as vacancy_router
from backend.api.v1.routers.client.tag import router as tag_router
from backend.api.v1.routers.client.company import router as company_router


client_v1_router = APIRouter(prefix='/api/v1/client')
client_v1_router.include_router(vacancy_router, tags=['client'], prefix='/vacancy')
client_v1_router.include_router(tag_router, tags=['client'], prefix='/tags')
client_v1_router.include_router(company_router, tags=['client'], prefix='/company')