import { axiosAuth, axiosNoAuth } from "@/shared/api/baseQueryInstance";
import { Company, Profile } from "../types/types";

class ProfileService {
  public async getCurrentProfile(): Promise<Profile> {
    const { data } = await axiosNoAuth.get<Profile>("/auth/current_user");

    return data;
  }

  public async updateCurrentProfile({ form }: { form: FormData }) {
    return await axiosAuth.put(
      "/client/user",
      form as unknown as Record<string, unknown>,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  public async getCompaniesList(): Promise<Array<Company>> {
    const { data } = await axiosAuth.get<Array<Company>>("/client/company/");

    return data;
  }

  public async getCompanyProfile(): Promise<Company> {
    const { data } = await axiosAuth.get<Company>("/company/");

    return data;
  }
}

export const {
  getCurrentProfile,
  updateCurrentProfile,
  getCompanyProfile,
  getCompaniesList,
} = new ProfileService();
