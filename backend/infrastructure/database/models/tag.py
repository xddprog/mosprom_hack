from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from backend.infrastructure.database.models.base import Base


if TYPE_CHECKING:
    from backend.infrastructure.database.models.vacancy import Vacancy
    from backend.infrastructure.database.models.student import Student

class Tag(Base):
    __tablename__ = "tags"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(unique=True, nullable=False)
    vacancies: Mapped[list["Vacancy"]] = relationship(secondary="vacancy_tags", back_populates="tags")
    students: Mapped[list["Student"]] = relationship(secondary="student_tags", back_populates="tags")


class VacancyTag(Base):
    __tablename__ = "vacancy_tags"
    vacancy_id: Mapped[int] = mapped_column(ForeignKey("vacancies.id"), primary_key=True)
    tag_id: Mapped[int] = mapped_column(ForeignKey("tags.id"), primary_key=True)


class StudentTag(Base):
    __tablename__ = "student_tags"
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id"), primary_key=True)
    tag_id: Mapped[int] = mapped_column(ForeignKey("tags.id"), primary_key=True)