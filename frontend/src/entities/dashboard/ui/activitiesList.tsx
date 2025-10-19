import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { ActivityDTO } from "../types/types";

interface ActivitiesListProps {
    data: ActivityDTO[];
}

export const ActivitiesList = ({ data }: ActivitiesListProps) => {
    return (
        <Card className="bg-white rounded-xl shadow-none">
            <CardHeader className="pb-4">
                <CardTitle className="text-[#383649] text-lg font-light">
                    Последние активности
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {data.slice(0, 5).map((activity, index) => (
                        <div
                            key={index}
                            className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                        >
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            <div className="flex-1">
                                <p className="text-sm text-gray-700">{activity.name}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {new Date().toLocaleDateString('ru-RU')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
