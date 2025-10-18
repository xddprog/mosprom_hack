import { useMutation } from "@tanstack/react-query";
import { userRegister } from "../api/authService";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "@/entities/token";
import { EProfileRoles, Profile } from "@/entities/profile/types/types";
import { ERouteNames } from "@/shared";

export const REGISTER_QUERY = "register-query";

export const useRegisterMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [REGISTER_QUERY],
    mutationFn: userRegister,
    onSuccess: (data: Profile) => {
      setAccessToken(crypto.randomUUID());
      if (data.role === EProfileRoles.COMPANY) {
        return navigate(`/${ERouteNames.DASHBOARD_COMPANY_ROUTE}`);
      }

      if (data.role === EProfileRoles.UNIVERSITY) {
        return navigate(`/${ERouteNames.DASHBOARD_UNIVERSITY_ROUTE}`);
      }

      if (data.role === EProfileRoles.ADMIN) {
        return navigate(`/${ERouteNames.DASHBOARD_ADMIN_ROUTE}`);
      }
    },
  });
};
