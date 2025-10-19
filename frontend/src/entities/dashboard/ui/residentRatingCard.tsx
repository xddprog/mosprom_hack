import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ResidentRatingDTO } from "../types/types";

interface ResidentRatingCardProps {
    data: ResidentRatingDTO;
    rank: number;
}

export const ResidentRatingCard = ({ data }: ResidentRatingCardProps) => {
    const navigate = useNavigate();
    // Рассчитываем процент для прогресс-бара (рейтинг от 0 до 100)
    const progressPercentage = Math.min(100, Math.max(0, data.rating_score));

    const handleDetailsClick = () => {
        navigate(`/company/${data.company_id}`);
    };

    return (
        <div className="flex flex-col justify-between bg-white rounded-3xl p-4 hover:shadow-xs transition-shadow cursor-pointer min-h-[150px]">
            {/* Верхняя секция с красным кругом и названием */}
            <div className="flex items-center mb-4">
                <div className="w-4 h-4 bg-[#D00E46] rounded-full mr-3 flex-shrink-0"></div>
                <span className="text-gray-900 font-medium truncate">
                    {data.company_name}
                </span>
            </div>

            {/* Нижняя секция с прогресс-баром и кнопкой */}
            <div className="flex items-center justify-between">
                {/* Круговой прогресс-бар */}
                <div className="relative w-8 h-8 flex-shrink-0">
                    <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                        {/* Фоновый круг */}
                        <circle
                            cx="16"
                            cy="16"
                            r="14"
                            stroke="#e5e7eb"
                            strokeWidth="3"
                            fill="none"
                        />
                        {/* Прогресс */}
                        <circle
                            cx="16"
                            cy="16"
                            r="14"
                            stroke="#D00E46"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 14}`}
                            strokeDashoffset={`${2 * Math.PI * 14 * (1 - progressPercentage / 100)}`}
                        />
                    </svg>
                </div>

                {/* Кнопка "Подробнее" */}
                <button
                    onClick={handleDetailsClick}
                    className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                >
                    <span>Подробнее</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                </button>
            </div>
        </div>
    );
};