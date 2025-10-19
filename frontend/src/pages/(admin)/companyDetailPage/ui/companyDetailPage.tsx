import { AvgSalaryCard, ResidentRatingMetricCard } from "@/entities/dashboard";
import { dashboardService } from "@/entities/dashboard/api/dashboardService";
import { TopTagsLinearCard } from "@/entities/dashboard";
import { VacancyWorkFormatCard } from "@/entities/dashboard/ui/vacancyWorkFormatCard";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export const CompanyDetailPage = () => {
    const { companyId } = useParams<{ companyId: string }>();
    const navigate = useNavigate();

    const { data: residentsRating, isLoading, error } = useQuery({
        queryKey: ['residents-rating'],
        queryFn: () => dashboardService.getResidentsRating(),
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Загрузка данных компании...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-red-500">Ошибка загрузки данных</div>
            </div>
        );
    }

    // Найти данные конкретной компании
    const companyData = residentsRating?.find(
        (company) => company.company_id === parseInt(companyId || "0")
    );

    if (!companyData) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Компания не найдена</div>
            </div>
        );
    }

    return (
        <div className="w-full mt-15">
            {/* Header с кнопкой назад и названием */}
            <div className="flex items-center mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-[#838194] hover:text-[#383649] mr-4"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-2xl font-light text-gray-[#383649]">
                    Рейтинг «{companyData.company_name}»
                </h1>
            </div>

            {/* Карточки метрик */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-2">
                <ResidentRatingMetricCard
                    title="Открыто вакансий"
                    currentValue={companyData.open_vacancies.current_value}
                    change={companyData.open_vacancies.change_from_last_month}
                    description="Количество активных вакансий компании в текущем месяце"
                />

                <ResidentRatingMetricCard
                    title="Просмотрено откликов"
                    currentValue={companyData.viewed_applications.current_value}
                    change={companyData.viewed_applications.change_from_last_month}
                    description="Количество откликов, которые компания просмотрела (все статусы кроме 'На рассмотрении')"
                />

                <ResidentRatingMetricCard
                    title="Проведено скринингов"
                    currentValue={companyData.screenings_conducted.current_value}
                    change={companyData.screenings_conducted.change_from_last_month}
                    description="Количество откликов, переведенных в статус 'Скрининг'"
                />

                <ResidentRatingMetricCard
                    title="Проведено собеседований"
                    currentValue={companyData.interviews_conducted.current_value}
                    change={companyData.interviews_conducted.change_from_last_month}
                    description="Количество откликов, переведенных в статус 'Собеседование'"
                />

                <ResidentRatingMetricCard
                    title="Отправлено офферов"
                    currentValue={companyData.offers_sent.current_value}
                    change={companyData.offers_sent.change_from_last_month}
                    description="Количество откликов, переведенных в статус 'Оффер'"
                />

                <ResidentRatingMetricCard
                    title="Отказы"
                    currentValue={companyData.rejections.current_value}
                    change={companyData.rejections.change_from_last_month}
                    description="Количество откликов, переведенных в статус 'Отказ'"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
                <ResidentRatingMetricCard
                    title="Откликов на вакансию"
                    currentValue={companyData.avg_applications_per_vacancy}
                    change={0}
                    description="Среднее количество откликов на одну вакансию компании"
                />

                <ResidentRatingMetricCard
                    title="Индекс свежести"
                    currentValue={Math.round(companyData.freshness_index * 100)}
                    change={0}
                    description="Показатель актуальности вакансий (100% - все вакансии свежие, 0% - все старые)"
                />

                <ResidentRatingMetricCard
                    title="Доля вузов"
                    currentValue={Math.round(companyData.university_applications_share * 100)}
                    change={0}
                    description="Процент откликов от студентов вузов от общего количества откликов"
                />

                <ResidentRatingMetricCard
                    title="Соотношение к среднему"
                    currentValue={companyData.applications_per_vacancy_ratio}
                    change={0}
                    description="Отношение среднего количества откликов компании к глобальному среднему по платформе"
                />
            </div>

            <div className="mb-2">
                <TopTagsLinearCard data={companyData.top_tags} />
            </div>
            <div className="mb-2">
                <AvgSalaryCard data={companyData.vacancy_grade_distribution} />
            </div>
            <div className="mb-2">
                <VacancyWorkFormatCard data={companyData.vacancy_work_format_distribution} />
            </div>
        </div>
    );
};
