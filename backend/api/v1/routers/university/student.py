from typing import Annotated
from dishka import FromDishka
from dishka.integrations.fastapi import inject
from fastapi import APIRouter, Depends, HTTPException, status

from backend.api.dependency.providers.request import UNIVERSITY_PROTECTED
from backend.core.dto.student_dto import (
    StudentDTO, StudentCreateDTO, StudentUpdateDTO, StudentListDTO,
    CollectiveApplicationCreateDTO, CollectiveApplicationDTO,
    StudentSubmissionDTO, StudentSubmissionResponseDTO
)
from backend.core.dto.user_dto import BaseUserModel
from backend.core.services.student_service import StudentService


router = APIRouter()


@router.get("/", response_model=list[StudentDTO])
@inject
async def get_students(
    service: FromDishka[StudentService],
    user: Annotated[BaseUserModel, Depends(UNIVERSITY_PROTECTED)],
    faculty: str | None = None,
    course_number: int | None = None
) -> list[StudentDTO]:
    """Получить студентов университета с возможностью фильтрации по факультету и курсу"""
    return await service.get_students_by_university(user.university_id, faculty, course_number)


@router.get("/{student_id}", response_model=StudentDTO)
@inject
async def get_student(
    service: FromDishka[StudentService],
    user: Annotated[BaseUserModel, Depends(UNIVERSITY_PROTECTED)],
    student_id: int
) -> StudentDTO:
    """Получить студента по ID"""
    return await service.get_student(student_id)


@router.post("/", response_model=StudentDTO)
@inject
async def create_student(
    service: FromDishka[StudentService],
    user: Annotated[BaseUserModel, Depends(UNIVERSITY_PROTECTED)],
    data: StudentCreateDTO
) -> StudentDTO:
    """Создать нового студента"""
    return await service.create_student(user.university_id, data)


@router.put("/{student_id}", response_model=StudentDTO)
@inject
async def update_student(
    service: FromDishka[StudentService],
    user: Annotated[BaseUserModel, Depends(UNIVERSITY_PROTECTED)],
    student_id: int,
    data: StudentUpdateDTO
) -> StudentDTO:
    """Обновить данные студента"""
    return await service.update_student(student_id, data)


@router.delete("/{student_id}")
@inject
async def delete_student(
    service: FromDishka[StudentService],
    user: Annotated[BaseUserModel, Depends(UNIVERSITY_PROTECTED)],
    student_id: int
) -> dict:
    """Удалить студента"""
    success = await service.delete_student(student_id)
    return {"success": success, "message": "Студент успешно удален"}


# Коллективные заявки
@router.post("/collective-applications", response_model=CollectiveApplicationDTO)
@inject
async def create_collective_application(
    service: FromDishka[StudentService],
    user: Annotated[BaseUserModel, Depends(UNIVERSITY_PROTECTED)],
    data: CollectiveApplicationCreateDTO
) -> CollectiveApplicationDTO:
    """Создать коллективную заявку на стажировку"""
    return await service.create_collective_application(user.university_id, data)


@router.get("/collective-applications", response_model=list[CollectiveApplicationDTO])
@inject
async def get_collective_applications(
    service: FromDishka[StudentService],
    user: Annotated[BaseUserModel, Depends(UNIVERSITY_PROTECTED)]
) -> list[CollectiveApplicationDTO]:
    """Получить все коллективные заявки университета"""
    return await service.get_collective_applications(user.university_id)


# Отправка списка студентов на вакансию (как на скриншоте)
@router.post("/submit-to-vacancy", response_model=StudentSubmissionResponseDTO)
@inject
async def submit_students_to_vacancy(
    service: FromDishka[StudentService],
    user: Annotated[BaseUserModel, Depends(UNIVERSITY_PROTECTED)],
    data: StudentSubmissionDTO
) -> StudentSubmissionResponseDTO:
    """Отправить список студентов на конкретную вакансию"""
    return await service.submit_students_to_vacancy(user.university_id, data)


# Статистика по студентам
@router.get("/statistics")
@inject
async def get_students_statistics(
    service: FromDishka[StudentService],
    user: Annotated[BaseUserModel, Depends(UNIVERSITY_PROTECTED)]
) -> dict:
    """Получить статистику по студентам для формирования коллективных заявок"""
    return await service.get_students_statistics(user.university_id)


