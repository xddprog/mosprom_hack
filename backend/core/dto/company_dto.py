from fastapi import Form, UploadFile
from pydantic import BaseModel

from backend.core.dto.application import CandidateCardDTO


class CompanyKanban(BaseModel):
    pass


class CompanyDTO(BaseModel):
    id: int
    name: str
    icon_url: str | None
    site_url: str | None
    industry: str | None
    

class KanbanColumnDTO(BaseModel):
    status: str
    total_candidates: int
    cards: list[CandidateCardDTO]


class CompanyUpdateDTO(BaseModel):
    name: str | None = Form(None)
    icon: UploadFile | None = Form(None)
    site_url: str | None = Form(None)
    industry: str | None = Form(None)