import { EAuthRoles } from "../types/types";

export const REGISTER_ROLE = [
  {
    id: 2,
    title: "Работодатель",
    role: EAuthRoles.COMPANY,
  },
  {
    id: 3,
    title: "Учебное заведение",
    role: EAuthRoles.UNIVERSITY,
  },
];

export const selectLabel: Record<EAuthRoles, string> = {
  [EAuthRoles.APPLICANT]: "Фио",
  [EAuthRoles.COMPANY]: "Название компании",
  [EAuthRoles.UNIVERSITY]: "Название учебного заведения",
  [EAuthRoles.ADMIN]: "Администратор",
};
