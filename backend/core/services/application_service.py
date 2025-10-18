from collections import defaultdict
from uuid import uuid4

from fastapi.responses import JSONResponse
from backend.core.clients.aws_client import AWSClient
from backend.core.dto.application import ApplicationCreateDTO, CandidateCardDTO
from backend.core.dto.company_dto import KanbanColumnDTO
from backend.core.repositories.application_repository import ApplicationRepository
from backend.infrastructure.database.models.application import Application
from backend.infrastructure.errors.application import ApplicationNotFoundError


class ApplicationService:
    def __init__(self, repository: ApplicationRepository, aws_client: AWSClient):
        self.repository = repository
        self.aws_client = aws_client

    async def create_application(self, application: ApplicationCreateDTO, vacancy_id: int):
        resume_link = await self.aws_client.upload_one_file(application.resume, f"resumes/{uuid4()}")
        application = await self.repository.add_item(
            **application.model_dump(exclude={"resume"}),
            resume_link=resume_link,
            vacancy_id=vacancy_id,
        )
        return JSONResponse(
            content={"message": "Вы успешно подали заявку на вакансию."}
        )
        
    async def get_kanban(self, company_id: int) -> list[KanbanColumnDTO]:
        db_applications = await self.repository.get_kanban(company_id)
        applications: defaultdict[str, Application] = defaultdict(list)
        for application in db_applications:
            applications[application.status].append(application)

        return [
            KanbanColumnDTO(
                status=status,
                total_candidates=len(apps),
                cards=[
                    CandidateCardDTO.model_validate(app, from_attributes=True)
                    for app in apps
                ]
            )
            for status, apps in applications.items()
        ]
    
    async def update_application_status(self, application_id: int, new_status: str, company_id: int):
        application = await self.repository.update_item(application_id, status=new_status)
        if not application:
            raise ApplicationNotFoundError()
        return CandidateCardDTO.model_validate(application, from_attributes=True)