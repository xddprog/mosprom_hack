from enum import Enum

from aiohttp.hdrs import FROM


class Role(str, Enum):
    UNIVERSITY = "University"
    COMPANY = "Company"
    ADMIN = "Admin"


class ApplicationStatus(str, Enum):
    ON_REVIEW = "on_review"
    SCREENING = "screening"
    INTERVIEW = "interview"
    OFFER = "offer"
    REJECTED = "rejected"


class ExperienceLevel(str, Enum):
    NOT_MATTER = "Not matter"
    NONE = "None"
    FROM_1_TO_3 = "From 1 to 3 years"
    FROM_3_TO_6 = "From 3 to 6 years"
    MORE_THAN_6 = "More than 6 years"


class WorkFormat(str, Enum):
    REMOTE = "Remote"
    OFFICE = "Office"
    HYBRID = "Hybrid"


class GroupApplicationStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"


class CollectiveApplicationStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"