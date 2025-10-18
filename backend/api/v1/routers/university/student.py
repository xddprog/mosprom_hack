from typing import Annotated
from dishka import FromDishka
from dishka.integrations.fastapi import inject
from fastapi import APIRouter, Depends, Form, Query
from fastapi.responses import JSONResponse

from backend.api.dependency.providers.request import UNIVERSITY_PROTECTED
from backend.core.dto.application import CollectiveApplicationDTO, CollectiveApplicationWithBookingsDTO, CreateCollectiveApplicationDTO, UpdateCollectiveApplicationDTO
from backend.core.dto.student_dto import (
    StudentDTO, StudentCreateDTO, StudentUpdateDTO,
)
from backend.core.dto.user_dto import BaseUserModel
from backend.core.services.student_service import StudentService
from backend.core.services.collective_application_service import CollectiveApplicationService
from backend.core.services.application_service import ApplicationService
from backend.core.services.vacancy_service import VacancyService
from backend.core.services.tag_service import TagService


router = APIRouter()


@router.get("/", response_model=list[StudentDTO])
@inject
async def get_students(
    service: FromDishka[StudentService],
    user: Annotated[BaseUserModel, Depends(UNIVERSITY_PROTECTED)],
    faculty: str | None = None,
    course_number: int | None = None,
    tag_ids: list[int] | None = Query(None)
) -> list[StudentDTO]:
    return await service.get_students(user.university_id, faculty, course_number, tag_ids)


@router.post("/", response_model=StudentDTO)
@inject
async def create_student(
    service: FromDishka[StudentService],
    user: Annotated[BaseUserModel, Depends(UNIVERSITY_PROTECTED)],
    tag_service: FromDishka[TagService],
    data: StudentCreateDTO = Form()
) -> StudentDTO:
    if data.tags:
        data.tags = await tag_service.get_tags(data.tags)
    else:
        data.tags = []
    return await service.create_student(user.university_id, data)


@router.put("/{student_id}", response_model=StudentDTO)
@inject
async def update_student(
    service: FromDishka[StudentService],
    user: Annotated[BaseUserModel, Depends(UNIVERSITY_PROTECTED)],
    student_id: int,
    data: StudentUpdateDTO = Form()
) -> StudentDTO:
    return await service.update_student(student_id, data)


@router.delete("/{student_id}")
@inject
async def delete_student(
    service: FromDishka[StudentService],
    user: Annotated[BaseUserModel, Depends(UNIVERSITY_PROTECTED)],
    student_id: int
) -> None:
    await service.delete_student(student_id)    


@router.post("/send-to-vacancy")
@inject
async def send_students_to_vacancy(
    vacancy_id: int,
    student_service: FromDishka[StudentService],
    application_service: FromDishka[ApplicationService],
    vacancy_service: FromDishka[VacancyService],
    user: Annotated[BaseUserModel, Depends(UNIVERSITY_PROTECTED)],
    student_ids: list[int] = Query(None),
) -> JSONResponse:
    await vacancy_service.check_vacancy_exists(vacancy_id)
    await student_service.check_students_exists(student_ids, user.university_id)
    return await application_service.create_students_applications(student_ids, vacancy_id, user.university_id)


@router.post("/send-to-companies")
@inject
async def send_students_to_company(
    service: FromDishka[CollectiveApplicationService],
    user: Annotated[BaseUserModel, Depends(UNIVERSITY_PROTECTED)],
    data: CreateCollectiveApplicationDTO
) -> CollectiveApplicationDTO:
    return await service.create_students_collective_application(data, user.university_id)
