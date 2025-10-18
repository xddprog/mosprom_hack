from email.mime import application
from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, JSON, Table
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import Mapped, mapped_column, relationship
from backend.infrastructure.database.models.base import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from backend.infrastructure.database.models.tag import Tag
    from backend.infrastructure.database.models.student import Student
    from backend.infrastructure.database.models.application import Application
    from backend.infrastructure.database.models.company import Company


class Vacancy(Base):
    __tablename__ = "vacancies"
    
    title: Mapped[str] = mapped_column(nullable=False)
    company_id: Mapped[int] = mapped_column(ForeignKey("companies.id"))
    region: Mapped[str]
    experience: Mapped[str]
    min_salary: Mapped[int] = mapped_column(nullable=True)
    max_salary: Mapped[int] = mapped_column(nullable=True)
    is_internship: Mapped[bool] = mapped_column(default=False)
    work_format: Mapped[str]

    responsibilities: Mapped[list[str]] = mapped_column(ARRAY(String), nullable=False)
    requirements: Mapped[list[str]] = mapped_column(ARRAY(String), nullable=False)
    conditions: Mapped[list[str]] = mapped_column(ARRAY(String), nullable=False)

    company: Mapped["Company"] = relationship(back_populates="vacancies")
    tags: Mapped[list["Tag"]] = relationship(secondary="vacancy_tags", back_populates="vacancies", lazy="selectin")
    applications: Mapped[list["Application"]] = relationship(back_populates="vacancy")