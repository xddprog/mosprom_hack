import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { useState } from "react";
import { TagStatsByMonthDTO } from "../types/types";

interface TopTagsCardProps {
    data: TagStatsByMonthDTO[] | undefined;
}

export const TopTagsCard = ({ data }: TopTagsCardProps) => {
    // Данные уже сгруппированы по месяцам с бэкенда
    const months = data || [];
    const [hoveredTag, setHoveredTag] = useState<{ month: number, tagIndex: number, tag: any } | null>(null);

    // Если нет данных, показываем заглушку
    if (!data || data.length === 0) {
        return (
            <Card className="bg-white rounded-xl shadow-none">
                <CardHeader className="pb-4">
                    <CardTitle className="text-[#383649] text-lg font-light">
                        Топ востребованных знаний
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-gray-500 py-8">
                        Нет данных о тегах
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-white rounded-xl shadow-none">
            <CardHeader className="pb-4">
                <CardTitle className="text-[#383649] text-lg font-light">
                    Топ востребованных знаний
                </CardTitle>
            </CardHeader>
            <CardContent>
                {/* Контейнер для диаграммы */}
                <div className="flex items-start justify-between h-full space-x-1">
                    {months.map((monthData, monthIndex) => (
                        <div key={monthIndex} className="flex flex-col items-center justify-end h-full w-full space-x-1 mr-2">
                            {/* Три тонкие колонки для каждого месяца */}
                            <div className="flex items-end space-x-0.5 w-full">
                                {monthData.tags.map((tagStats, tagIndex) => {
                                    // Находим максимальное количество в месяце
                                    const maxCount = Math.max(...monthData.tags.map(t => t.count));

                                    return (
                                        <div
                                            key={tagIndex}
                                            className="flex flex-col items-center justify-end h-full flex-1 group cursor-pointer relative"
                                            onMouseEnter={() => setHoveredTag({ month: monthData.month, tagIndex, tag: tagStats })}
                                            onMouseLeave={() => setHoveredTag(null)}
                                        >
                                            <div
                                                className="w-full rounded-sm transition-all duration-200 bg-gray-200 group-hover:bg-[#D00E46] min-h-[8px]"
                                                style={{
                                                    height: `${Math.max((tagStats.count / maxCount) * 100, 8)}px`
                                                }}
                                            />
                                            {/* Кастомный tooltip */}
                                            {hoveredTag?.month === monthData.month && hoveredTag?.tagIndex === tagIndex && (
                                                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg z-10 whitespace-nowrap">
                                                    {tagStats.tag.name}: {tagStats.count} упоминаний
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            {/* Подпись месяца */}
                            <span className="text-xs text-gray-500 mt-1">
                                {monthData.month}
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};