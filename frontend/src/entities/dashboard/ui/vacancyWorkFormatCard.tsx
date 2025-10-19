import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { useState } from "react";
import { VacancyWorkFormatDistributionDTO } from "../types/types";

interface VacancyWorkFormatCardProps {
    data: VacancyWorkFormatDistributionDTO[] | undefined;
}

export const VacancyWorkFormatCard = ({ data }: VacancyWorkFormatCardProps) => {
    const [hoveredFormat, setHoveredFormat] = useState<{ formatIndex: number, format: VacancyWorkFormatDistributionDTO } | null>(null);

    const translatedWorkFormats = {
        "Remote": "Удаленно",
        "Office": "Офис",
        "Hybrid": "Гибрид"
    };
    // Если нет данных, показываем заглушку
    if (!data || data.length === 0) {
        return (
            <Card className="bg-white rounded-xl shadow-none">
                <CardHeader className="pb-4">
                    <CardTitle className="text-[#383649] text-lg font-light">
                        Формат работы
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-gray-500 py-8">
                        Нет данных о форматах работы
                    </div>
                </CardContent>
            </Card>
        );
    }

    // Находим максимальное количество для расчета высоты столбцов
    const maxCount = Math.max(...data.map(f => f.count));

    return (
        <Card className="bg-white rounded-xl shadow-none">
            <CardHeader className="pb-4">
                <CardTitle className="text-[#383649] text-lg font-light">
                    Формат работы
                </CardTitle>
            </CardHeader>
            <CardContent>
                {/* Горизонтальная диаграмма форматов работы */}
                <div className="flex items-end space-x-1 h-[120px]">
                    {data.map((formatData, index) => (
                        <div
                            key={formatData.work_format}
                            className="flex flex-col items-center justify-end h-full flex-1 group cursor-pointer relative"
                            onMouseEnter={() => setHoveredFormat({ formatIndex: index, format: formatData })}
                            onMouseLeave={() => setHoveredFormat(null)}
                        >
                            <div
                                className="w-full rounded-sm transition-all duration-200 bg-gray-200 group-hover:bg-[#D00E46] min-h-[8px]"
                                style={{
                                    height: `${Math.max((formatData.count / maxCount) * 100, 8)}px`
                                }}
                            />
                            {/* Название формата работы внизу */}
                            <div className="mt-2 text-center">
                                <span className="text-xs text-gray-500 leading-tight">
                                    {translatedWorkFormats[formatData.work_format as keyof typeof translatedWorkFormats]}
                                </span>
                            </div>
                            {/* Кастомный tooltip с количеством */}
                            {hoveredFormat?.formatIndex === index && (
                                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg z-10 whitespace-nowrap">
                                    {formatData.count} вакансий
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
