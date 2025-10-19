import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { useState } from "react";
import { AvgSalaryByGradeDTO } from "../types/types";

interface AvgSalaryCardProps {
    data: AvgSalaryByGradeDTO[];
}

export const AvgSalaryCard = ({ data }: AvgSalaryCardProps) => {
    const [hoveredGrade, setHoveredGrade] = useState<{ grade: string, salary: number } | null>(null);

    if (!data || data.length === 0) {
        return null;
    }

    const maxSalary = Math.max(...data.map(item => item.avg_salary));

    return (
        <Card className="bg-white rounded-xl shadow-none">
            <CardHeader className="pb-4">
                <CardTitle className="text-[#383649] text-lg font-light">
                    Средняя зарплата по грейдам
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-end justify-between h-[150px] space-x-2">
                    {data.map((gradeData, index) => {
                        const heightPercentage = maxSalary > 0 ? (gradeData.avg_salary / maxSalary) * 100 : 0;
                        const translatedGrade = {
                            "Not matter": "Не важно",
                            "None": "Без опыта",
                            "From 1 to 3 years": "1-3 года",
                            "From 3 to 6 years": "3-6 лет",
                            "More than 6 years": "6+ лет",
                        };

                        return (
                            <div
                                key={index}
                                className="flex flex-col items-center justify-end h-full flex-1 group cursor-pointer relative"
                                onMouseEnter={() => setHoveredGrade({ grade: gradeData.grade, salary: gradeData.avg_salary })}
                                onMouseLeave={() => setHoveredGrade(null)}
                            >
                                <div
                                    className="w-full rounded-sm transition-all duration-200 bg-gray-200 group-hover:bg-[#D00E46]"
                                    style={{
                                        height: `${heightPercentage}%`,
                                        minHeight: '8px'
                                    }}
                                />

                                {hoveredGrade?.grade === gradeData.grade && (
                                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg z-10 whitespace-nowrap">
                                        {translatedGrade[gradeData.grade as keyof typeof translatedGrade]}: {gradeData.avg_salary.toLocaleString('ru-RU')} ₽
                                    </div>
                                )}

                                <span className="text-xs text-gray-500 mt-1 text-center">
                                    {translatedGrade[gradeData.grade as keyof typeof translatedGrade]}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};