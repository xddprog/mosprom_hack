import { useMutation } from "@tanstack/react-query";
import { createVacancy, responseByVacancy } from "../api/vacancyService";

export const useCreateVacancy = () => {
  return useMutation({
    mutationFn: createVacancy,
  });
};

export const useResponseByVacancy = () => {
  return useMutation({
    mutationFn: responseByVacancy,
  });
};
