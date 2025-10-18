from backend.core.clients.aws_client import AWSClient
from backend.core.repositories.user_repository import UserRepository
from backend.core.dto.user_dto import BaseUserModel, UserUpdateForm
from backend.infrastructure.database.models.user import User
from backend.infrastructure.errors.auth_errors import UserAlreadyExists

class UserService:
    def __init__(self, user_repository: UserRepository, aws_client: AWSClient):
        self.repository = user_repository
        self.aws_client = aws_client
