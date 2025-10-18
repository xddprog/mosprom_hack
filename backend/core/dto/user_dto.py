from fastapi import Form, UploadFile
from pydantic import BaseModel, EmailStr, field_validator

from backend.infrastructure.config.loads import AWS_STORAGE_CONFIG
from backend.utils.enums import Role


class BaseUserModel(BaseModel):
    id: int
    email: str
    full_name: str
    image_url: str | None = None
    cv_file: str | None = None
    role: Role
    company_id: int | None = None
    university_id: int | None = None
    

class UserUpdateForm(BaseModel):
    email: EmailStr | None = Form(None)
    username: str | None = Form(None)
    image_url: UploadFile | None = Form(None)
    cv_file: UploadFile | None = Form(None)