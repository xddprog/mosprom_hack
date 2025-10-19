from fastapi import APIRouter, Depends

from backend.api.v1.routers.admin.dashboard import router as dashboard_router
from backend.api.v1.routers.admin.company import router as company_router
from backend.api.dependency.providers.request import ADMIN_PROTECTED


admin_v1_router = APIRouter(prefix='/api/v1/admin')


admin_v1_router.include_router(dashboard_router, tags=['admin'], prefix='/dashboard', dependencies=[Depends(ADMIN_PROTECTED)])
admin_v1_router.include_router(company_router, tags=['admin'], prefix='/company', dependencies=[Depends(ADMIN_PROTECTED)])