from fastapi import APIRouter, Depends
from backend.api.dependency.providers.request import COMPANY_PROTECTED, require_role
from backend.api.v1.routers.auth.auth import router as auth_router
from backend.api.v1.routers.company.application import router as application_router
from backend.api.v1.routers.company.vacancy import router as vacancy_router
from backend.api.v1.routers.company.company import router as main_router


company_v1_router = APIRouter(prefix='/api/v1/company')

company_v1_router.include_router(vacancy_router, tags=['company'], dependencies=[Depends(COMPANY_PROTECTED)])
company_v1_router.include_router(main_router, tags=['company'], dependencies=[Depends(COMPANY_PROTECTED)])
company_v1_router.include_router(application_router, tags=['company'], dependencies=[Depends(COMPANY_PROTECTED)])