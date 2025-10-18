import { ProfileCvDrawer } from "@/features/profile/ui/profileCvDrawer";
import { ProfileInfoDrawer } from "@/features/profile/ui/profileInfoDrawer";
import { ProfileUniversityDrawer } from "@/features/profile/ui/profileUniversityDrawer";
import { JSX } from "react";

export const enum EDrawerVariables {
  PROFILE_DRAWER = "profile-drawer",
  PROFILE_CV_DRAWER = "profile-cv-drawer",
  PROFILE_UNIVERSITY_DRAWER = "profile-university-drawer",
}

export const drawerComponents: Record<EDrawerVariables, JSX.Element> = {
  [EDrawerVariables.PROFILE_DRAWER]: <ProfileInfoDrawer />,
  [EDrawerVariables.PROFILE_CV_DRAWER]: <ProfileCvDrawer />,
  [EDrawerVariables.PROFILE_UNIVERSITY_DRAWER]: <ProfileUniversityDrawer />,
};

export const getDrawerComponent = (type: EDrawerVariables): React.ReactNode => {
  return drawerComponents[type];
};
