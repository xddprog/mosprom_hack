interface ResidentRatingMetricCardProps {
    title: string;
    currentValue: number;
    change: number;
    description?: string;
}
export const ResidentRatingMetricCard = ({
    title,
    currentValue,
    change,
    description
}: ResidentRatingMetricCardProps) => {
    const formatChange = (changeValue: number) => {
        if (changeValue === 0) return "+0 за мес.";
        const sign = changeValue > 0 ? "+" : "";
        return `${sign} ${changeValue} за мес.`;
    };

    const formatRatio = (ratio: number) => {
        return `${Math.round(ratio * 100)}%`;
    };

    return (
        <div
            className="bg-white rounded-2xl p-3 flex flex-col justify-between h-full relative group cursor-help"
        >
            {description && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 max-w-xs text-center">
                    {description}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
            )}

            <div className="text-lg text-[#383649] font-light">
                {title}
            </div>

            <div className="flex items-end justify-between mt-4">

                <div className="text-[64px] font-bold text-[#D00E46] leading-none">
                    {title === "Соотношение к среднему"
                        ? formatRatio(currentValue)
                        : currentValue
                    }
                </div>

                <div className="text-md text-[#838194] font-light text-[16px]">
                    {formatChange(change)}
                </div>
            </div>
        </div>
    );
};