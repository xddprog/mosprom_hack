import { useMutation } from "@tanstack/react-query";
import { getUniversityByName } from "../api/universityService";

export const useUniversitySuggestions = () => {
  const mutationQuery = useMutation({
    mutationFn: getUniversityByName,
  });

  return {
    ...mutationQuery,
    selectData: mutationQuery.data?.reduce((acc, item) => {
      acc.push({
        label: item.value.trim(),
        value: item.unrestricted_value.trim(),
      });
      return acc;
    }, [] as Array<{ label: string; value: string }>),
  };
};
