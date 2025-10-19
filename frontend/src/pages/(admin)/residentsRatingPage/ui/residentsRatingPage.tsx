import { dashboardService } from "@/entities/dashboard/api/dashboardService";
import { ResidentsRatingList } from "@/entities/dashboard/ui/residentsRatingList";
import { useQuery } from "@tanstack/react-query";

export const ResidentsRatingPage = () => {
    const { data: residentsRating, isLoading, error } = useQuery({
        queryKey: ['residents-rating'],
        queryFn: () => dashboardService.getResidentsRating(),
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Загрузка рейтинга резидентов...</div>
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

    return (
        <div className="w-full">
            <ResidentsRatingList data={residentsRating || []} />
        </div>
    );
};