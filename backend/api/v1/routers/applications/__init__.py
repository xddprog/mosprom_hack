from fastapi import APIRouter

from backend.api.v1.routers.applications.collective import router as collective_router


applications_v1_router = APIRouter(prefix="/api/v1/applications")


applications_v1_router.include_router(collective_router, tags=["applications"], prefix="/collective")