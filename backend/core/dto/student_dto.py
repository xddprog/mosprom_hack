from fastapi import Form, UploadFile
from pydantic import BaseModel, EmailStr
from typing import Optional


class StudentDTO(BaseModel):
    id: int
    full_name: str
    email: str
    age: int
    phone_number: str | None = None
    resume_link: str | None = None
    course_number: int
    faculty: str
    university_id: int


class StudentCreateDTO(BaseModel):
    full_name: str
    email: EmailStr
    age: int
    phone_number: str | None = None
    resume_link: str | None = None
    course_number: int
    faculty: str


class StudentUpdateDTO(BaseModel):
    full_name: str | None = Form(None)
    email: EmailStr | None = Form(None)
    age: int | None = Form(None)
    phone_number: str | None = Form(None)
    resume: UploadFile | None = Form(None)
    course_number: int | None = Form(None)
    faculty: str | None = Form(None)


class StudentListDTO(BaseModel):
    students: list[StudentDTO]
    total: int


class CollectiveApplicationDTO(BaseModel):
    id: int
    university_id: int
    course_number: int
    faculty: str
    student_count: int
    desired_period: str
    resume_cloud_link: str | None = None
    comment: str | None = None
    status: str  # "pending", "approved", "rejected"
    created_at: str


class CollectiveApplicationCreateDTO(BaseModel):
    course_number: int
    faculty: str
    student_count: int
    desired_period: str
    resume_cloud_link: str | None = None
    comment: str | None = None


class CollectiveApplicationUpdateDTO(BaseModel):
    course_number: int | None = Form(None)
    faculty: str | None = Form(None)
    student_count: int | None = Form(None)
    desired_period: str | None = Form(None)
    resume_cloud_link: str | None = Form(None)
    comment: str | None = Form(None)


# DTO для отправки списка студентов (как на скриншоте)
class StudentSubmissionDTO(BaseModel):
    vacancy_id: int
    student_ids: list[int]
    consent_to_data_processing: bool


class StudentSubmissionResponseDTO(BaseModel):
    success: bool
    message: str
    submitted_count: int