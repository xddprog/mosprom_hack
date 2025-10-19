import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { StuckApplicationsDTO } from "../types/types";

interface StuckApplicationsListProps {
    data: StuckApplicationsDTO[];
}

export const StuckApplicationsList = ({ data }: StuckApplicationsListProps) => {
    return (
        <Card className="bg-white rounded-xl shadow-none">
            <CardHeader className="pb-4">
                <CardTitle className="text-[#383649] text-lg font-light">
                    Застрявшие отклики
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {data.slice(0, 5).map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-red-500 rounded-full" />
                                <span className="text-sm font-medium text-gray-800">
                                    {item.company.name}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">
                                    {item.count} откликов
                                </span>
                                <div className="w-8 h-6 bg-red-100 rounded flex items-center justify-center">
                                    <span className="text-xs font-bold text-red-600">
                                        {item.count}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
