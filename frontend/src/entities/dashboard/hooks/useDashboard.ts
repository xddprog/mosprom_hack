import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../api/dashboardService";

export const DASHBOARD_QUERY_KEY = "dashboard-query";

export const useDashboard = () => {
    return useQuery({
        queryKey: [DASHBOARD_QUERY_KEY],
        queryFn: () => dashboardService.getDashboard(),
    });
};
