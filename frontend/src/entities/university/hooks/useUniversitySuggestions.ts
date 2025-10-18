import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createStudentInUniversity,
  deleteStudentFromUniversity,
  getUniversityByName,
  getUniversityStudents,
} from "../api/universityService";

export const useUniversitySuggestions = (
  universityName: string | undefined
) => {
  return useQuery({
    queryFn: () =>
      getUniversityByName({ universityName: universityName ?? "" }),
    queryKey: ["university-list", universityName],
    enabled: !!universityName,
    select: (data) =>
      data?.reduce((acc, item) => {
        acc.push({
          label: item.name,
          value: String(item.id),
        });
        return acc;
      }, [] as Array<{ label: string; value: string }>),
  });
};

export const useCreateStudent = () => {
  return useMutation({
    mutationFn: createStudentInUniversity,
  });
};

export const useUniversityStudents = () => {
  return useQuery({
    queryFn: getUniversityStudents,
    queryKey: ["university-students-list"],
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStudentFromUniversity,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["university-students-list"] }),
  });
};
