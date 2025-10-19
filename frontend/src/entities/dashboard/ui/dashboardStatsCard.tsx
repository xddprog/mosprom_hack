// src/shared/ui/DashboardStatsCard.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { DashboardStatsDTO } from "../types/types"; // Предполагаем, что тип выглядит так: { monthly_data: number[], current_value: number }

interface DashboardStatsCardProps {
    title: string;
    data: DashboardStatsDTO;
    // Сделаем цвет обязательным, так как он всегда есть для последнего столбца
    highlightColor?: string;
}

export const DashboardStatsCard = ({
    title,
    data,
    highlightColor = "bg-[#D00E46]" // Цвет по умолчанию, как на макете
}: DashboardStatsCardProps) => {
    const allData = [...data.monthly_data];

    const maxValue = Math.max(...allData);

    return (
        <Card className="bg-white rounded-xl shadow-none">
            <CardHeader className="pb-4">
                <CardTitle className="text-[#383649] text-lg font-light">
                    {title} - {data.current_value}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {/* Контейнер для диаграммы */}
                <div className="flex items-end justify-between h-[100px] space-x-2"> {/* Задаем фиксированную высоту контейнеру */}

                    {allData.map((value, index) => {
                        // 3. Расчет высоты столбца в процентах
                        // Устанавливаем минимальную высоту, чтобы даже нулевые значения были видны
                        const heightPercentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
                        const finalHeight = Math.max(heightPercentage, 10); // мин. высота 5%

                        // 4. Определяем, является ли столбец последним
                        const isLast = index === allData.length - 1;

                        return (
                            <div key={index} className="flex flex-col items-center justify-end h-full w-full">
                                {/* Сам столбец диаграммы */}
                                <div
                                    className={`w-full rounded-md transition-all duration-300 ${isLast ? highlightColor : 'bg-gray-200' // Цвет в соответствии с макетом
                                        }`}
                                    style={{ height: `${finalHeight}%` }}
                                    title={`${value}`} // Добавляем title для всплывающей подсказки при наведении
                                />
                                {/* 5. Подпись под столбцом. В макете она везде одинаковая "10", 
                                    что, скорее всего, плейсхолдер. Отобразим реальное значение.
                                    Можно добавить условие, чтобы показывать только для некоторых столбцов.
                                */}
                                <span className="pt-2 text-xs text-gray-500">{value}</span>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};