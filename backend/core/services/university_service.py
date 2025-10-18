from backend.core.repositories.university_repository import UniversityRepository
from backend.core.dto.university_dto import UniversityDTO

class UniversityService:
    def __init__(self, university_repository: UniversityRepository):
        self.university_repository = university_repository

    async def get_universities(self, name: str | None = None) -> list[UniversityDTO]:
        universities = await self.university_repository.get_all(name)
        return [UniversityDTO.model_validate(university, from_attributes=True) for university in universities]