import { useDashboard } from "../hooks/useDashboard";
import { ActivitiesList } from "./activitiesList";
import { AvgSalaryCard } from "./avgSalaryCard";
import { DashboardStatsCard } from "./dashboardStatsCard";
import { StuckApplicationsList } from "./stuckApplicationsList";
import { SupplyDemandChart } from "./supplyDemandChart";
import { TopTagsCard } from "./topTagsCard";

export const Dashboard = () => {
    const { data: dashboard, isLoading, error } = useDashboard();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Загрузка...</div>
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

    if (!dashboard) {
        return null;
    }

    return (
        <div className="w-full mb-10">
            <div className="flex flex-col gap-2">
                <DashboardStatsCard
                    title="Всего вакансий"
                    data={dashboard.total_active_vacancies}
                />
                <DashboardStatsCard
                    title="Новые заявки"
                    data={dashboard.total_new_applications}
                />
                <DashboardStatsCard
                    title="Компании"
                    data={dashboard.companies_for_hiring}
                />
                <DashboardStatsCard
                    title="Среднее время закрытия"
                    data={dashboard.avg_closing_time}
                />
                <SupplyDemandChart data={dashboard.supply_demand.map(item => ({ ...item, month: String(item.month) }))} />
                <TopTagsCard data={dashboard.top_tags} />
                <AvgSalaryCard data={dashboard.avg_salary_by_grade} />
                <ActivitiesList data={dashboard.activities} />
                <StuckApplicationsList data={dashboard.stuck_applications} />
            </div>
        </div>
    );
};
