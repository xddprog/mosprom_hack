from typing import TYPE_CHECKING
from sqlalchemy import Boolean, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.infrastructure.database.models.base import Base


if TYPE_CHECKING:
    from backend.infrastructure.database.models.company import Company
    from backend.infrastructure.database.models.university import University


class User(Base):
    __tablename__ = "users"

    full_name: Mapped[str] = mapped_column(nullable=False)
    email: Mapped[str] = mapped_column(unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    role: Mapped[str] = mapped_column(nullable=False)

    company_id: Mapped[int | None] = mapped_column(ForeignKey("companies.id"), nullable=True)
    university_id: Mapped[int | None] = mapped_column(ForeignKey("universities.id"), nullable=True)
    
    company: Mapped["Company"] = relationship(back_populates="users")
    university: Mapped["University"] = relationship(back_populates="users")