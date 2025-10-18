import { axiosNoAuth } from "@/shared/api/baseQueryInstance";
import { EUniversityEndpoints } from "../lib/endpoints";
import { ErrorMessages } from "@/shared/api/queryError";
import { UniversitySuggest } from "../types/types";

class UniversityService {
  public async getUniversityByName({
    universityName,
  }: {
    universityName: string;
  }): Promise<Array<UniversitySuggest>> {
    try {
      const { data } = await axiosNoAuth.post<Array<UniversitySuggest>>(
        `${EUniversityEndpoints.UNIVERSITIES_SUGGESTION}`,
        {
          query: universityName,
          count: 20,
        }
      );
      return data;
    } catch (error) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }

  public async createOrGetUniversity({
    universitySuggest,
  }: {
    universitySuggest: UniversitySuggest;
  }): Promise<{ universityId: string }> {
    try {
      const { data } = await axiosNoAuth.post<{ universityId: string }>(
        `${EUniversityEndpoints.CREATE_OR_GET_UNIVERSITY}`,
        {
          json: universitySuggest,
        }
      );
      return data;
    } catch (error) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }
}

export const { getUniversityByName, createOrGetUniversity } =
  new UniversityService();
