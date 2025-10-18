import { CreateVacancyDto, Tag, Vacancy } from "../types/types";
import { axiosAuth } from "@/shared/api/baseQueryInstance";

class VacancyService {
  public async getAllVacancy(): Promise<Array<Vacancy>> {
    const { data } = await axiosAuth.get<Array<Vacancy>>("/client/vacancy", {});

    return data;
  }

  public async getVacancyById({
    vacancyId,
  }: {
    vacancyId: string;
  }): Promise<Vacancy | null> {
    const { data } = await axiosAuth.get<Vacancy>(
      `/client/vacancy/${vacancyId}`
    );

    return data;
  }

  public async getVacancyTags(): Promise<Array<Tag> | null> {
    const { data } = await axiosAuth.get<Array<Tag>>(`/client/tags`);

    return data;
  }

  public async getVacancyByCompany({
    companyId,
  }: {
    companyId: number;
  }): Promise<Array<Vacancy>> {
    const { data } = await axiosAuth.get<Array<Vacancy>>(
      `/company/${companyId}/vacancy`
    );

    return data;
  }

  public async createVacancy(vacancyData: CreateVacancyDto): Promise<Vacancy> {
    const { data } = await axiosAuth.post<Vacancy>("/company/vacancy", {
      ...vacancyData,
    });

    return data;
  }

  public async responseByVacancy({
    resume,
    email,
    full_name,
    vacancy_id,
  }: {
    resume: FormData;
    email: string;
    full_name: string;
    vacancy_id: number;
  }) {
    return await axiosAuth.post(
      `/client/vacancy/${vacancy_id}/apply?email=${email}&full_name=${full_name}`,
      resume as unknown as Record<string, unknown>,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  public async deleteVacancy({ vacancyId }: { vacancyId: string }) {
    return await axiosAuth.delete(`/company/vacancy/${vacancyId}`);
  }
}

export const {
  getAllVacancy,
  getVacancyById,
  createVacancy,
  getVacancyTags,
  responseByVacancy,
  getVacancyByCompany,
  deleteVacancy,
} = new VacancyService();
