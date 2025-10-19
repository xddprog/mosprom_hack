export interface DashboardStatsDTO {
    current_value: number;
    monthly_data: number[];
}

export interface TagDTO {
    id: number;
    name: string;
}

export interface TagStatsByMonthDTO {
    month: number;
    tags: TagStatsDTO[];
}

export interface TagStatsDTO {
    tag: TagDTO;
    count: number;
}

export interface AvgSalaryByGradeDTO {
    grade: string;
    avg_salary: number;
}

export interface ActivityDTO {
    name: string;
}

export interface CompanyActivityDTO {
    id: number;
    name: string;
}

export interface StuckApplicationsDTO {
    company: CompanyActivityDTO;
    count: number;
}

export interface SupplyDemandDTO {
    month: number;
    supply: number;
    demand: number;
}

export interface ResidentRatingMetricDTO {
    current_value: number;
    change_from_last_month: number;
    change_percentage: number;
}

export interface VacancyGradeDistributionDTO {
    grade: string;
    count: number;
    avg_salary: number;
}

export interface VacancyWorkFormatDistributionDTO {
    work_format: string;
    count: number;
}

export interface HotVacancyDTO {
    id: number;
    title: string;
    days_open: number;
}


export interface ResidentRatingDTO {
    company_id: number;
    company_name: string;
    rating_score: number;

    // Основные метрики
    open_vacancies: ResidentRatingMetricDTO;
    viewed_applications: ResidentRatingMetricDTO;
    screenings_conducted: ResidentRatingMetricDTO;
    interviews_conducted: ResidentRatingMetricDTO;
    offers_sent: ResidentRatingMetricDTO;
    rejections: ResidentRatingMetricDTO;

    // Дополнительные метрики
    avg_applications_per_vacancy: number;
    global_avg_applications_per_vacancy: number;
    applications_per_vacancy_ratio: number;
    freshness_index: number;
    university_applications_share: number;

    // Специальные данные
    top_tags: TagStatsDTO[];
    hot_vacancy: HotVacancyDTO | null;
    vacancy_grade_distribution: VacancyGradeDistributionDTO[];
    vacancy_work_format_distribution: VacancyWorkFormatDistributionDTO[];
}

export interface DashboardDTO {
    total_active_vacancies: DashboardStatsDTO;
    total_new_applications: DashboardStatsDTO;
    companies_for_hiring: DashboardStatsDTO;
    avg_closing_time: DashboardStatsDTO;
    top_tags: TagStatsByMonthDTO[];
    avg_salary_by_grade: AvgSalaryByGradeDTO[];
    activities: ActivityDTO[];
    stuck_applications: StuckApplicationsDTO[];
    supply_demand: SupplyDemandDTO[];
}
