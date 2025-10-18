from fastapi import Form, UploadFile
from pydantic import BaseModel, EmailStr
from typing import Optional


class TagDTO(BaseModel):
    id: int
    name: str


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
    tags: list[TagDTO]


class StudentCreateDTO(BaseModel):
    full_name: str = Form()
    email: EmailStr = Form()
    age: int = Form()
    phone_number: str | None = Form(None)
    resume: UploadFile | None = Form(None)
    course_number: int = Form()
    faculty: str = Form()
    tags: list[int] | None = Form(None)


class StudentUpdateDTO(BaseModel):
    full_name: str | None = Form(None)
    email: EmailStr | None = Form(None)
    age: int | None = Form(None)
    phone_number: str | None = Form(None)
    resume: UploadFile | None = Form(None)
    course_number: int | None = Form(None)
    faculty: str | None = Form(None)
    tag_ids: list[int] | None = Form(None)