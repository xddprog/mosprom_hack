from fastapi import APIRouter
from backend.api.v1.routers.university.student import router as student_router

university_v1_router = APIRouter(prefix="/university", tags=["university"])

university_v1_router.include_router(student_router, prefix="/students")
