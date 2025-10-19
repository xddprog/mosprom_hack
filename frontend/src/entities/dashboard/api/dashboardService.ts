import { axiosAuth } from "@/shared/api/baseQueryInstance";
import { DashboardDTO, ResidentRatingDTO } from "../types/types";

class DashboardService {
    public async getDashboard(): Promise<DashboardDTO> {
        const response = await axiosAuth.get<DashboardDTO>('/admin/dashboard');
        return response.data;
    }

    public async getResidentsRating(): Promise<ResidentRatingDTO[]> {
        const response = await axiosAuth.get<ResidentRatingDTO[]>('/admin/dashboard/residents-rating');
        return response.data;
    }
}

export const dashboardService = new DashboardService();
