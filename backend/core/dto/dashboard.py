from pydantic import BaseModel

from backend.core.dto.application import CompanyDTO
from backend.core.dto.vacancy_dto import TagDTO, VacancyBaseDTO


class AvgSalaryByGradeDTO(BaseModel):
    grade: str
    avg_salary: int


class TagStatsDTO(BaseModel):
    tag: TagDTO
    count: int


class TagStatsByMonthDTO(BaseModel):
    month: int
    tags: list[TagStatsDTO]


class DashboardStatsDTO(BaseModel):
    current_value: int
    monthly_data: list[int]


class VacancyActivityDTO(BaseModel):
    id: int
    name: str


class CompanyActivityDTO(BaseModel):
    id: int
    name: str


class ActivityDTO(BaseModel):
    name: str


class StuckApplicationsDTO(BaseModel):
    company: CompanyActivityDTO
    count: int


class SupplyDemandDTO(BaseModel):
    month: int
    supply: int  # количество вакансий
    demand: int  # количество заявок


class ResidentRatingMetricDTO(BaseModel):
    current_value: int
    change_from_last_month: int
    change_percentage: float


class VacancyGradeDistributionDTO(BaseModel):
    grade: str
    count: int
    avg_salary: float


class VacancyWorkFormatDistributionDTO(BaseModel):
    work_format: str
    count: int


class HotVacancyDTO(BaseModel):
    id: int
    title: str
    days_open: int


class ResidentRatingDTO(BaseModel):
    company_id: int
    company_name: str
    rating_score: float
    icon_url: str | None
    industry: str | None
    site_url: str | None
    
    # Основные метрики
    open_vacancies: ResidentRatingMetricDTO
    viewed_applications: ResidentRatingMetricDTO
    screenings_conducted: ResidentRatingMetricDTO
    interviews_conducted: ResidentRatingMetricDTO
    offers_sent: ResidentRatingMetricDTO
    rejections: ResidentRatingMetricDTO
    
    # Дополнительные метрики
    avg_applications_per_vacancy: float
    global_avg_applications_per_vacancy: float
    applications_per_vacancy_ratio: float  # отношение к глобальному среднему
    
    freshness_index: float  # индекс свежести вакансий
    university_applications_share: float  # доля откликов от вузов
    
    top_tags: list[TagStatsDTO]
    hot_vacancy: HotVacancyDTO
    vacancy_grade_distribution: list[VacancyGradeDistributionDTO]
    vacancy_work_format_distribution: list[VacancyWorkFormatDistributionDTO]


class DashboardDTO(BaseModel):
    total_active_vacancies: DashboardStatsDTO
    total_new_applications: DashboardStatsDTO
    companies_for_hiring: DashboardStatsDTO
    avg_closing_time: DashboardStatsDTO
    top_tags: list[TagStatsByMonthDTO]
    avg_salary_by_grade: list[AvgSalaryByGradeDTO]
    activities: list[ActivityDTO]
    stuck_applications: list[StuckApplicationsDTO]
    supply_demand: list[SupplyDemandDTO]