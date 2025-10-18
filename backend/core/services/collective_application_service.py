from backend.core.dto.application import CollectiveApplicationDTO, CollectiveApplicationWithBookingsDTO, CreateCollectiveApplicationDTO, UpdateCollectiveApplicationDTO
from backend.core.repositories.collective_application_repository import CollectiveApplicationRepository
from backend.infrastructure.errors.application import CollectiveApplicationNotFoundError


class CollectiveApplicationService:
    def __init__(self, collective_application_repository: CollectiveApplicationRepository) :
        self.collective_application_repository = collective_application_repository
    
    async def create_students_collective_application(self, form: CreateCollectiveApplicationDTO, university_id: int) -> CollectiveApplicationDTO:
        collective_application = await self.collective_application_repository.add_item(
            **form.model_dump(exclude={"resume"}),
            university_id=university_id,
        )
        return CollectiveApplicationDTO.model_validate(collective_application, from_attributes=True)

    async def get_collective_application_by_id(self, collective_application_id: int) -> CollectiveApplicationWithBookingsDTO:
        collective_application = await self.collective_application_repository.get_with_bookings(collective_application_id)
        if not collective_application:
            raise CollectiveApplicationNotFoundError()
        return CollectiveApplicationWithBookingsDTO.model_validate(collective_application, from_attributes=True)

    async def get_all_collective_applications(self, limit: int, offset: int) -> list[CollectiveApplicationDTO]:
        collective_applications = await self.collective_application_repository.get_all(
            limit=limit,
            offset=offset,
        )
        return [
            CollectiveApplicationDTO.model_validate(collective_application, from_attributes=True)
            for collective_application in collective_applications
        ]   

    async def update_collective_application(self, collective_application_id: int, data: UpdateCollectiveApplicationDTO) -> CollectiveApplicationDTO:
        collective_application = await self.collective_application_repository.update_item(
            collective_application_id, 
            **data.model_dump(exclude_unset=True)
        )
        if not collective_application:
            raise CollectiveApplicationNotFoundError()
        return CollectiveApplicationDTO.model_validate(collective_application, from_attributes=True)

    async def delete_collective_application(self, collective_application_id: int) -> None:
        collective_application = await self.collective_application_repository.get_item(collective_application_id)
        if not collective_application:
            raise CollectiveApplicationNotFoundError()
        await self.collective_application_repository.delete_item(collective_application)

    