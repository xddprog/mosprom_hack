import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { useState } from "react";
import { TagStatsDTO } from "../types/types";

interface TopTagsLinearCardProps {
    data: TagStatsDTO[] | undefined;
}

export const TopTagsLinearCard = ({ data }: TopTagsLinearCardProps) => {
    const [hoveredTag, setHoveredTag] = useState<{ tagIndex: number, tag: TagStatsDTO } | null>(null);

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

    // Находим максимальное количество для расчета высоты столбцов
    const maxCount = Math.max(...data.map(t => t.count));
    const topTags = data.slice(0, 10);

    return (
        <Card className="bg-white rounded-xl shadow-none">
            <CardHeader className="pb-4">
                <CardTitle className="text-[#383649] text-lg font-light">
                    Топ востребованных знаний
                </CardTitle>
            </CardHeader>
            <CardContent>
                {/* Горизонтальная диаграмма тегов */}
                <div className="flex items-end space-x-1 h-[120px]">
                    {topTags.map((tagStats, index) => (
                        <div
                            key={tagStats.tag.id}
                            className="flex flex-col items-center justify-end h-full flex-1 group cursor-pointer relative"
                            onMouseEnter={() => setHoveredTag({ tagIndex: index, tag: tagStats })}
                            onMouseLeave={() => setHoveredTag(null)}
                        >
                            <div
                                className="w-full rounded-sm transition-all duration-200 bg-gray-200 group-hover:bg-[#D00E46] min-h-[8px]"
                                style={{
                                    height: `${Math.max((tagStats.count / maxCount) * 100, 8)}px`
                                }}
                            />
                            {/* Название скилла внизу */}
                            <div className="mt-2 text-center">
                                <span className="text-xs text-gray-500 leading-tight">
                                    {tagStats.tag.name}
                                </span>
                            </div>
                            {/* Кастомный tooltip с количеством */}
                            {hoveredTag?.tagIndex === index && (
                                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg z-10 whitespace-nowrap">
                                    {tagStats.count} упоминаний
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
