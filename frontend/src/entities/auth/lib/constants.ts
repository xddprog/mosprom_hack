import { EProfileRoles } from "@/entities/profile/types/types";

export const REGISTER_ROLE = [
  {
    id: 2,
    title: "Работодатель",
    role: EProfileRoles.COMPANY,
  },
  {
    id: 3,
    title: "Учебное заведение",
    role: EProfileRoles.UNIVERSITY,
  },
];

export const selectLabel: Record<EProfileRoles, string> = {
  [EProfileRoles.COMPANY]: "Название компании",
  [EProfileRoles.UNIVERSITY]: "Название учебного заведения",
  [EProfileRoles.ADMIN]: "Администратор",
};
