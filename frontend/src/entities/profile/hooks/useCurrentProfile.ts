import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCompaniesList,
  getCurrentProfile,
  updateCurrentProfile,
} from "../api/profileService";
import { queryClient } from "@/shared/api/queryClient";

export const CURRENT_PROFILE_QUERY = "current-profile";
export const COMPANY_LIST_QUERY = "company-list";

export const useCurrentProfile = () => {
  return useQuery({
    queryKey: [CURRENT_PROFILE_QUERY],
    queryFn: getCurrentProfile,
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateCurrentProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CURRENT_PROFILE_QUERY] });
    },
  });
};

export const useGetCompanyList = () => {
  return useQuery({
    queryKey: [COMPANY_LIST_QUERY],
    queryFn: getCompaniesList,
  });
};
