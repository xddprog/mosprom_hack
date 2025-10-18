import { useCurrentProfile } from "@/entities/profile/hooks/useCurrentProfile";
import { ProfileInfoBadge } from "@/features/profile/ui/profileInfoBadge";
import { EDrawerVariables } from "@/shared";
import { useActions } from "@/shared/hooks/useActions";
import { IconButton } from "@/shared/ui/button/iconButton";
import { ChevronLeft, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { data: currentProfile, isSuccess, isPending } = useCurrentProfile();

  const navigate = useNavigate();
  const { setOpenDrawer } = useActions();

  const handleToDashboard = () => navigate(-1);

  const handleOpenProfileInfoDrawer = () =>
    setOpenDrawer({
      isOpen: true,
      type: EDrawerVariables.PROFILE_DRAWER,
      data: { currentProfile },
    });

  if (!isSuccess || isPending) {
    return (
      <span>
        <Loader className="animate-spin" />
      </span>
    );
  }

  return (
    <div className="text-white flex flex-col space-y-3">
      <div className="flex justify-start items-center">
        <IconButton ariaLabel="вернуться назад" onClick={handleToDashboard}>
          <ChevronLeft className="h-6 w-6" />
        </IconButton>
      </div>

      <div className="space-y-3">
        <ProfileInfoBadge
          currentProfile={currentProfile}
          onClick={handleOpenProfileInfoDrawer}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
