import { useMutation } from "@tanstack/react-query";
import { createOrGetUniversity } from "../api/universityService";

export const useCreateOrGetUniversity = () => {
  return useMutation({
    mutationFn: createOrGetUniversity,
  });
};
