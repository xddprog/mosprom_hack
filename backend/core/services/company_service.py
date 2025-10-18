from collections import defaultdict
from uuid import uuid4
from backend.core.dto.company_dto import CompanyDTO, CompanyUpdateDTO
from backend.core.repositories.company_repository import CompanyRepository
from backend.infrastructure.database.models.application import Application
from backend.infrastructure.database.models.company import Company
from backend.infrastructure.errors.company import CompanyNotFoundError
from backend.core.clients.aws_client import AWSClient


class CompanyService:
    def __init__(self, company_repository: CompanyRepository, aws_client: AWSClient):
        self.company_repository = company_repository
        self.aws_client = aws_client

    async def get_all(self, name: str | None = None) -> list[Company]:
        companies =  await self.company_repository.get_all()
        return [
            CompanyDTO.model_validate(company, from_attributes=True)
            for company in companies
        ]
    async def check_company(self, company_id: int) -> Company | None:
        company = await self.company_repository.get_item(company_id)
        return company
    
    async def get_company(self, company_id: int) -> CompanyDTO:
        company = await self.company_repository.get_item(company_id)
        
        if not company:
            raise CompanyNotFoundError()
        return CompanyDTO.model_validate(company, from_attributes=True)

    async def update_company(self, company_id: int, data: CompanyUpdateDTO) -> CompanyDTO:
        company = await self.company_repository.get_item(company_id)
        if company:
            raise CompanyNotFoundError()
        if data.icon:
            data.icon = await self.aws_client.upload_one_file(data.icon, f"companies/{uuid4()}")
        company = await self.company_repository.update_item(company_id, **data.model_dump(exclude_unset=True))
        return CompanyDTO.model_validate(company, from_attributes=True)

    async def delete_company(self, company_id: int) -> bool:
        company = await self.company_repository.get_item(company_id)
        if company:
            raise CompanyNotFoundError()
            
        if company.icon_url:
            await self.aws_client.delete_one_file(company.icon_url)
        await self.company_repository.delete_item(company)
        return True