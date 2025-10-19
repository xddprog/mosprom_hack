from typing import AsyncIterable
from dishka import FromDishka, Provider, Scope, provide
from dishka.integrations.fastapi import inject
from fastapi import Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from backend.core import repositories, services
from backend.core.clients.aws_client import AWSClient
from backend.core.dto.user_dto import BaseUserModel
from backend.infrastructure.database.connection.postgres_connection import DatabaseConnection
from backend.infrastructure.errors.auth_errors import ForbiddenError, InvalidToken
from backend.utils.enums import Role


class RequestProvider(Provider):
    @provide(scope=Scope.SESSION)
    async def get_session(self, db_connection: DatabaseConnection) -> AsyncIterable[AsyncSession]:
        session = await db_connection.get_session()
        try:
            yield session
        finally:
            await session.close()

    @provide(scope=Scope.SESSION)
    async def get_auth_service(self, session: AsyncSession) -> services.AuthService:
        return services.AuthService(repository=repositories.UserRepository(session))

    @provide(scope=Scope.REQUEST)
    async def get_user_service(self, session: AsyncSession, aws_client: AWSClient) -> services.UserService:
        return services.UserService(
            user_repository=repositories.UserRepository(session),
            aws_client=aws_client
        )

    @provide(scope=Scope.REQUEST)
    async def get_vacancy_service(self, session: AsyncSession) -> services.VacancyService:
        return services.VacancyService(
            vacancy_repository=repositories.VacancyRepository(session)
        )

    @provide(scope=Scope.REQUEST)
    async def get_tag_service(self, session: AsyncSession) -> services.TagService:
        return services.TagService(
            tag_repository=repositories.TagRepository(session)
        )

    @provide(scope=Scope.REQUEST)
    async def get_company_service(self, session: AsyncSession, aws_client: AWSClient) -> services.CompanyService:
        return services.CompanyService(
            company_repository=repositories.CompanyRepository(session),
            aws_client=aws_client
        )
    
    @provide(scope=Scope.REQUEST)
    async def get_application_service(self, session: AsyncSession, aws_client: AWSClient) -> services.ApplicationService:
        return services.ApplicationService(
            repository=repositories.ApplicationRepository(session),
            aws_client=aws_client
        )

    @provide(scope=Scope.REQUEST)
    async def get_student_service(self, session: AsyncSession, aws_client: AWSClient) -> services.StudentService:
        return services.StudentService(
            student_repository=repositories.StudentRepository(session),
            aws_client=aws_client
        )

    @provide(scope=Scope.REQUEST)
    async def get_collective_application_service(self, session: AsyncSession) -> services.CollectiveApplicationService:
        return services.CollectiveApplicationService(
            collective_application_repository=repositories.CollectiveApplicationRepository(session)
        )

    @provide(scope=Scope.REQUEST)
    async def get_university_service(self, session: AsyncSession) -> services.UniversityService:
        return services.UniversityService(
            university_repository=repositories.UniversityRepository(session)
        )

    @provide(scope=Scope.REQUEST)
    async def get_dashboard_service(self, session: AsyncSession) -> services.DashboardService:
        return services.DashboardService(
            dashboard_repository=repositories.DashboardRepository(session)
        )

    @provide(scope=Scope.REQUEST)
    async def get_resident_rating_service(self, session: AsyncSession) -> services.ResidentRatingService:
        return services.ResidentRatingService(
            resident_rating_repository=repositories.ResidentRatingRepository(session)
        )

def require_role(allowed_roles: list[Role]):
    @inject
    async def dependency(
        auth_service: FromDishka[services.AuthService],
        company_service: FromDishka[services.CompanyService],
        request: Request,
    ) -> BaseUserModel:
        token = request.cookies.get("access_token")
        user, payload = await auth_service.verify_token(token)
        user_role_str = payload.get("role")
        if not user_role_str:
            raise InvalidToken()
        if Role(user_role_str) not in allowed_roles:
            raise ForbiddenError()
        if user.role == Role.COMPANY:
            company = await company_service.check_company(user.company_id)
            if not company:
                raise ForbiddenError()
        return user
    return dependency


COMPANY_PROTECTED = require_role([Role.COMPANY])
ADMIN_PROTECTED = require_role([Role.ADMIN])
UNIVERSITY_PROTECTED = require_role([Role.UNIVERSITY])
