from uuid import uuid4
from aiohttp.web_app import Application
from backend.core.clients.aws_client import AWSClient
from backend.core.dto.application import ApplicationCreateDTO
from backend.core.repositories.vacancy_repository import VacancyRepository
from backend.core.dto.vacancy_dto import VacancyBaseDTO, VacancyCreateDTO, VacancyFilters, VacancyFromCompanyDTO, VacancyPublicDTO, VacancyUpdateDTO
from backend.infrastructure.errors.vacancy import VacancyNotFoundError

class VacancyService:
    def __init__(self, vacancy_repository: VacancyRepository):
        self.vacancy_repository = vacancy_repository

    async def create_vacancy(self, company_id: int, data: VacancyCreateDTO):
        vacancy = await self.vacancy_repository.add_item(**data.model_dump(exclude_unset=True), company_id=company_id)
        return VacancyFromCompanyDTO.model_validate(vacancy, from_attributes=True)
    
    async def get_vacancies(self, filters: VacancyFilters):
        vacancies = await self.vacancy_repository.get_all(**filters.model_dump(exclude={"limit", "offset"}))
        return [VacancyPublicDTO.model_validate(vacancy, from_attributes=True) for vacancy in vacancies]

    async def get_vacancies_from_company(self, filters: VacancyFilters):
        vacancies = await self.vacancy_repository.get_all(**filters.model_dump())
        return [VacancyFromCompanyDTO.model_validate(vacancy, from_attributes=True) for vacancy in vacancies]
    
    async def check_vacancy_exists(self, vacancy_id: int):
        vacancy = await self.vacancy_repository.get_item(vacancy_id)
        if not vacancy:
            raise VacancyNotFoundError()
    
    async def update_vacancy(self, vacancy_id: int, data: VacancyUpdateDTO, company_id: int):
        vacancy = await self.vacancy_repository.get_item(vacancy_id)
        if not vacancy or vacancy.company_id != company_id:
            raise VacancyNotFoundError()
        vacancy = await self.vacancy_repository.update_item(vacancy_id, **data.model_dump(exclude_unset=True))
        return VacancyFromCompanyDTO.model_validate(vacancy, from_attributes=True)

    async def delete_vacancy(self, vacancy_id: int, company_id: int):
        vacancy = await self.vacancy_repository.get_item(vacancy_id)
        if not vacancy or vacancy.company_id != company_id:
            raise VacancyNotFoundError()
        await self.vacancy_repository.delete_item(vacancy)

    # async def get_vacancy(self, vacancy_id: int):
    #     vacancy = await self.vacancy_repository.get_item(vacancy_id)
    #     if not vacancy:
    #         raise VacancyNotFoundError()
    #     return VacancyFromCompanyDTO.model_validate(vacancy, from_attributes=True)
