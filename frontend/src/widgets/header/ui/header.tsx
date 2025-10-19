import { useLogoutMutation } from "@/entities/auth/hooks/useLogout";
import { useCurrentProfile } from "@/entities/profile/hooks/useCurrentProfile";
import { ERouteNames } from "@/shared";
import { Button, Image } from "@/shared/ui";
import { Container } from "@/widgets/container/container";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { data: profile, error, isLoading } = useCurrentProfile();
  const navigate = useNavigate();
  const logoutMutation = useLogoutMutation();

  const handleLoginClick = () => {
    navigate(`/${ERouteNames.AUTH_ROUTE}/${ERouteNames.LOGIN_ROUTE}`);
  };

  const handleRegisterClick = () => {
    navigate(`/${ERouteNames.AUTH_ROUTE}/${ERouteNames.REGISTER_ROUTE}`);
  };

  const handleLogoutClick = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="bg-white h-16">
      <Container className="flex justify-between items-center h-full">
        <div>
          <Image alt="logo" src={"/images/company/techpolis-logo.png"} />
        </div>

        {!profile && (
          <div className="flex gap-2">
            <Button
              onClick={handleRegisterClick}
              className="bg-[#F0F3F7] text-black hover:bg-[#F0F3F7] rounded-3xl"
            >
              Регистрация
            </Button>
            <Button
              onClick={handleLoginClick}
              className="bg-[#D00E46] hover:bg-[#D00E46] rounded-3xl"
            >
              Вход
            </Button>
          </div>
        )}

        {profile && !error && (
          <div className="flex items-center gap-4">
            <span className="text-gray-700 text-sm">
              {profile.full_name}
            </span>
            <Button
              onClick={handleLogoutClick}
              disabled={logoutMutation.isPending}
              className="bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-3xl flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              {logoutMutation.isPending ? "Выход..." : "Выход"}
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};
