import { useQuery } from "@tanstack/react-query";
import { getAllVacancy, getVacancyTags } from "../api/vacancyService";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { vacancySelectors } from "../model/store/vacancySlice";
import { VACANCY_ALL_QUERY } from "../lib/queryKeys";

export const useGetVacancy = () => {
  const vacancyFilters = useAppSelector(vacancySelectors.vacancyFIlters);

  return useQuery({
    queryKey: [VACANCY_ALL_QUERY, vacancyFilters],
    // queryFn: () => getAllVacancy(vacancyFilters),
    queryFn: () => getAllVacancy(),
  });
};

export const VACANCY_TAGS_QUERY = "vacancy-tags";

export const useGetTags = () => {
  return useQuery({
    queryKey: [VACANCY_TAGS_QUERY],
    queryFn: () => getVacancyTags(),
  });
};
