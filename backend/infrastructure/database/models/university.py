from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from backend.infrastructure.database.models.base import Base


if TYPE_CHECKING:
    from backend.infrastructure.database.models.application import Application
    from backend.infrastructure.database.models.student import Student
    from backend.infrastructure.database.models.user import User


class University(Base):
    __tablename__ = "universities"
    
    name: Mapped[str] = mapped_column(nullable=False)

    students: Mapped[list["Student"]] = relationship(back_populates="university")
    users: Mapped[list["User"]] = relationship(back_populates="university")
    applications: Mapped[list["Application"]] = relationship(back_populates="university")