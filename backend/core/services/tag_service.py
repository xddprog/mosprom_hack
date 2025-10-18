from backend.core.dto.vacancy_dto import TagDTO
from backend.core.repositories.tag_repository import TagRepository

class TagService:
    def __init__(self, tag_repository: TagRepository):
        self.tag_repository = tag_repository

    async def get_tags(self, tag_ids: list[int]):
        tags = await self.tag_repository.get_by_ids(tag_ids)
        return tags
    
    async def get_all(self, name: str):
        tags = await self.tag_repository.get_all(name=name)
        return [TagDTO.model_validate(tag, from_attributes=True) for tag in tags]