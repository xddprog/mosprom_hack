from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from backend.utils.enums import CollectiveApplicationStatus
from backend.infrastructure.database.models.base import Base


if TYPE_CHECKING:
    from backend.infrastructure.database.models.university import University
    from backend.infrastructure.database.models.company import Company

class CollectiveApplication(Base):
    __tablename__ = "collective_applications"
    
    university_id: Mapped[int] = mapped_column(ForeignKey("universities.id"))
    course_number: Mapped[int]
    faculty: Mapped[str]
    student_count: Mapped[int]
    desired_period: Mapped[str]
    comment: Mapped[str | None] = mapped_column(nullable=True)
    status: Mapped[CollectiveApplicationStatus] = mapped_column(default=CollectiveApplicationStatus.PENDING, nullable=False)
    
    university: Mapped["University"] = relationship(back_populates="collective_applications")
    bookings: Mapped[list["CollectiveApplicationBooking"]] = relationship(back_populates="collective_application")


class CollectiveApplicationBooking(Base):
    __tablename__ = "collective_application_bookings"
    
    collective_application_id: Mapped[int] = mapped_column(ForeignKey("collective_applications.id"))
    company_id: Mapped[int] = mapped_column(ForeignKey("companies.id"))
    booked_count: Mapped[int]
    comment: Mapped[str | None] = mapped_column(nullable=True)
    
    collective_application: Mapped["CollectiveApplication"] = relationship(back_populates="bookings")
    company: Mapped["Company"] = relationship()
