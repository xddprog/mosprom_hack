from fastapi import APIRouter
from backend.api.v1.routers.university.student import router as student_router
from backend.api.v1.routers.university.applications import router as applications_router

university_v1_router = APIRouter(prefix="/university", tags=["university"])

university_v1_router.include_router(student_router, prefix="/students")
university_v1_router.include_router(applications_router, prefix="/applications")