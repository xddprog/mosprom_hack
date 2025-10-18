from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from backend.infrastructure.database.models.base import Base


if TYPE_CHECKING:
    from backend.infrastructure.database.models.user import User
    from backend.infrastructure.database.models.vacancy import Vacancy


class Company(Base):
    __tablename__ = "companies"
    
    name: Mapped[str] = mapped_column(unique=True, nullable=False)
    icon_url: Mapped[str | None] = mapped_column(nullable=True)
    industry: Mapped[str | None] = mapped_column(nullable=True)
    site_url: Mapped[str | None] = mapped_column(nullable=True)

    users: Mapped[list["User"]] = relationship(back_populates="company")
    vacancies: Mapped[list["Vacancy"]] = relationship(back_populates="company")


class CompanyVacancy(Base):
    __tablename__ = "company_vacancies"

    company_id: Mapped[int] = mapped_column(ForeignKey("companies.id"), primary_key=True)
    vacancy_id: Mapped[int] = mapped_column(ForeignKey("vacancies.id"), primary_key=True)