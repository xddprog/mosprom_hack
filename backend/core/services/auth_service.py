import hashlib
import hmac
import json
from datetime import datetime, timedelta

from jwt import InvalidTokenError, encode, decode
from passlib.context import CryptContext

from backend.core.dto.auth_dto import LoginForm, RegisterForm
from backend.core.dto.user_dto import BaseUserModel
from backend.core.repositories.user_repository import UserRepository
from backend.infrastructure.config.loads import JWT_CONFIG
from backend.infrastructure.database.models.user import User
from backend.utils.enums import Role
from backend.infrastructure.errors.auth_errors import (
    InvalidLoginData,
    InvalidToken,
    UserAlreadyNotRegister,
    UserAlreadyRegister,
    ForbiddenError, 
)


class AuthService:
    def __init__(self, repository: UserRepository) -> None:
        self.repository = repository
        self.context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    async def get_user_by_email(self, email: str) -> User | None:
        user = await self.repository.get_by_attribute("email", email)
        return None if not user else user[0]
    
    async def verify_password(self, password: str, hashed_password: str) -> bool:
        return self.context.verify(password, hashed_password)

    async def authenticate_user(
        self,
        form: LoginForm,
        required_role: Role | None = None
    ) -> User:
        user = await self.get_user_by_email(form.email)
        if not user:
            raise UserAlreadyNotRegister()
        if not await self.verify_password(form.password, user.password):
            raise InvalidLoginData()
        
        if required_role and user.role != required_role:
            raise ForbiddenError(f"Access denied. Required role: {required_role.value}")
            
        return user

    async def create_access_token(self, user: User) -> str:
        expire = datetime.now() + timedelta(minutes=JWT_CONFIG.JWT_ACCESS_TOKEN_TIME)
        data = {"exp": expire, "sub": user.email, "role": user.role}
        token = encode(
            data,
            JWT_CONFIG.JWT_SECRET, 
            algorithm=JWT_CONFIG.JWT_ALGORITHM
        )
        return token
    
    async def create_refresh_token(self, user: User) -> str:
        expire = datetime.now() + timedelta(days=JWT_CONFIG.JWT_REFRESH_TOKEN_TIME)
        data = {"exp": expire, "sub": user.email}
        return encode(
            data, 
            JWT_CONFIG.JWT_SECRET, 
            algorithm=JWT_CONFIG.JWT_ALGORITHM
        )

    async def verify_token(self, token: str | None) -> tuple[BaseUserModel, dict]:
        if not token:
            raise InvalidToken()
        try:
            payload = decode(
                token,
                JWT_CONFIG.JWT_SECRET,
                algorithms=[JWT_CONFIG.JWT_ALGORITHM],
            )
            email = payload.get("sub")
            if not email:
                raise InvalidToken()
            
            user = await self.get_user_by_email(email)
            if not user:
                raise InvalidToken()
                
            return BaseUserModel.model_validate(user, from_attributes=True), payload
        except InvalidTokenError:
            raise InvalidToken()

    async def register_user(self,form: RegisterForm) -> tuple[BaseUserModel, str, str]:
        user = await self.get_user_by_email(form.email)
        if user:
            raise UserAlreadyRegister()

        hashed_password = self.context.hash(form.password)
        
        new_user_data = form.model_dump()
        new_user_data["password"] = hashed_password

        new_user = await self.repository.add_item(**new_user_data)

        access_token = await self.create_access_token(new_user)
        refresh_token = await self.create_refresh_token(new_user)
        
        return BaseUserModel.model_validate(new_user, from_attributes=True), access_token, refresh_token
    
    async def login_user(
        self,
        form: LoginForm,
        required_role: Role | None = None
    ) -> tuple[BaseUserModel, str, str]:
        user_db = await self.authenticate_user(form, required_role=required_role)
        
        access_token = await self.create_access_token(user_db)
        refresh_token = await self.create_refresh_token(user_db)
        
        user_dto = BaseUserModel.model_validate(user_db, from_attributes=True)
        return user_dto, access_token, refresh_token

    async def check_user_exist(self, email: str) -> bool:
        user = await self.get_user_by_email(email)
        return user is not None