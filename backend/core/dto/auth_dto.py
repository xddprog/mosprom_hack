from pydantic import BaseModel, EmailStr, model_validator

from backend.utils.enums import Role


class RegisterForm(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: Role
    company_id: int | None = None
    university_id: int | None = None

    @model_validator(mode="after")
    def check_role_specific_ids(self):
        if self.role == Role.COMPANY:
            if self.company_id is None:
                raise ValueError("company_id is required for the COMPANY role.")
            self.university_id = None

        elif self.role == Role.UNIVERSITY:
            if self.university_id is None:
                raise ValueError("university_id is required for the UNIVERSITY role.")
            self.company_id = None
        
        else:
            self.company_id = None
            self.university_id = None
            
        return self
        
class LoginForm(BaseModel):
    email: EmailStr
    password: str


class LoginAdminForm(LoginForm):
    email: str