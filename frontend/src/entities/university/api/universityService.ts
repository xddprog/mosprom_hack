import { axiosAuth, axiosNoAuth } from "@/shared/api/baseQueryInstance";
import { ErrorMessages } from "@/shared/api/queryError";
import { Student, UniversitySuggest } from "../types/types";

class UniversityService {
  public async getUniversityByName({
    universityName,
  }: {
    universityName: string;
  }): Promise<Array<UniversitySuggest>> {
    try {
      const { data } = await axiosNoAuth.get<Array<UniversitySuggest>>(
        `/client/university?name=${universityName}&limit=20`
      );
      return data;
    } catch (error) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }

  public async createStudentInUniversity({
    studentFormData,
  }: {
    studentFormData: FormData;
  }) {
    return await axiosAuth.post(
      `/university/students`,
      studentFormData as unknown as Record<string, unknown>,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  public async getUniversityStudents(): Promise<Array<Student>> {
    try {
      const { data } = await axiosNoAuth.get<Array<Student>>(
        `/university/students`
      );
      return data;
    } catch (error) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }

  public async deleteStudentFromUniversity({
    student_id,
  }: {
    student_id: number;
  }) {
    try {
      return await axiosNoAuth.delete<Array<Student>>(
        `/university/students/${student_id}`
      );
    } catch (error) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }
}

export const {
  getUniversityByName,
  createStudentInUniversity,
  getUniversityStudents,
  deleteStudentFromUniversity,
} = new UniversityService();
