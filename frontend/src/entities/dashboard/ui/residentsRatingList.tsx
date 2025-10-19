import { ResidentRatingDTO } from "../types/types";
import { ResidentRatingCard } from "./residentRatingCard";

interface ResidentsRatingListProps {
    data: ResidentRatingDTO[];
}

export const ResidentsRatingList = ({ data }: ResidentsRatingListProps) => {
    if (!data || data.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                Нет данных о рейтинге резидентов
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 gap-4">
            {data.map((resident, index) => (
                <ResidentRatingCard
                    key={resident.company_id}
                    data={resident}
                    rank={index + 1}
                />
            ))}
        </div>
    );
};
