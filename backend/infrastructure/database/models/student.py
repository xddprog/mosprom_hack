from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.infrastructure.database.models.base import Base


if TYPE_CHECKING:
    from backend.infrastructure.database.models.university import University
    from backend.infrastructure.database.models.application import Application
    from backend.infrastructure.database.models.tag import Tag


class Student(Base):
    __tablename__ = "students"

    full_name: Mapped[str]
    email: Mapped[str]
    age: Mapped[int]
    phone_number: Mapped[str | None]
    resume_link: Mapped[str | None]
    course_number: Mapped[int]
    faculty: Mapped[str]

    university_id: Mapped[int] = mapped_column(ForeignKey("universities.id"))

    university: Mapped["University"] = relationship(back_populates="students")
    applications: Mapped[list["Application"]] = relationship(back_populates="student")
    tags: Mapped[list["Tag"]] = relationship(secondary="student_tags", back_populates="students")
    