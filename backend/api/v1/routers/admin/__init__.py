from fastapi import APIRouter, Depends

from backend.utils.enums import Role


admin_v1_router = APIRouter(prefix='/api/v1/admin')


