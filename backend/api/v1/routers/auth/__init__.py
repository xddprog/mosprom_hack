from fastapi import APIRouter
from backend.api.v1.routers.auth.auth import router


auth_v1_router = APIRouter(prefix='/api/v1/auth')


auth_v1_router.include_router(router, tags=['auth'])