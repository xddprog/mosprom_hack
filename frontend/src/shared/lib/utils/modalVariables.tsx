import { UniversityAttachInternshipModal } from "@/entities/university/ui/universityAttachInternshipModal";
import { VacancyManagementModal } from "@/features/vacancy/ui/vacancyManagementModal";
import { JSX } from "react";

export const enum EModalVariables {
  ATTACH_STUDENT_ON_INTERNSHIP = "ATTACH_STUDENT_ON_INTERNSHIP",
  VACANCY_MANAGEMENT_MODAL = "VACANCY_MANAGEMENT_MODAL",
}

export const modalComponents: Record<EModalVariables, JSX.Element> = {
  [EModalVariables.ATTACH_STUDENT_ON_INTERNSHIP]: (
    <UniversityAttachInternshipModal />
  ),
  [EModalVariables.VACANCY_MANAGEMENT_MODAL]: <VacancyManagementModal />,
};

export const getModalComponent = (type: EModalVariables): React.ReactNode => {
  return modalComponents[type];
};
