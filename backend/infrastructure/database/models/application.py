from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.utils.enums import ApplicationStatus
from .base import Base
from typing import TYPE_CHECKING


if TYPE_CHECKING:
    from backend.infrastructure.database.models.vacancy import Vacancy
    from backend.infrastructure.database.models.university import University
    from backend.infrastructure.database.models.student import Student


class Application(Base):
    __tablename__ = "applications"

    vacancy_id: Mapped[int] = mapped_column(ForeignKey("vacancies.id"))
    full_name: Mapped[str | None]
    email: Mapped[str | None]
    resume_link: Mapped[str | None]
    status: Mapped[str] = mapped_column(default=ApplicationStatus.ON_REVIEW, nullable=False)
    
    university_id: Mapped[int | None] = mapped_column(ForeignKey("universities.id"))
    student_id: Mapped[int | None] = mapped_column(ForeignKey("students.id"))

    vacancy: Mapped["Vacancy"] = relationship(back_populates="applications")
    university: Mapped["University"] = relationship()
    student: Mapped["Student"] = relationship()