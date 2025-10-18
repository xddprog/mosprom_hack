import { ApplicantActivityStatus } from "@/entities/profile/types/types";
import {
  Briefcase,
  Search,
  School,
  Brain,
  MinusCircle,
  Megaphone,
} from "lucide-react";

export const APPLICANT_ACTIVITY_STATUSES: ApplicantActivityStatus[] = [
  {
    id: "active_search",
    name: "В активном поиске",
    description: "Соискатель активно ищет работу.",
    icon: Search,
    color: "text-emerald-500",
    bgColor: "bg-emerald-900/20",
  },
  {
    id: "employed",
    name: "Работаю",
    description: "Соискатель в настоящее время трудоустроен.",
    icon: Briefcase,
    color: "text-blue-500",
    bgColor: "bg-blue-900/20",
  },
  {
    id: "internship",
    name: "На стажировке",
    description: "Соискатель проходит стажировку.",
    icon: School,
    color: "text-purple-500",
    bgColor: "bg-purple-900/20",
  },
  {
    id: "hackathon",
    name: "Участвую в хакатоне",
    description: "Соискатель участвует в хакатоне.",
    icon: Brain,
    color: "text-yellow-500",
    bgColor: "bg-yellow-900/20",
  },
  {
    id: "open_to_offers",
    name: "Открыт для предложений",
    description: "Соискатель не ищет активно, но рассмотрит предложения.",
    icon: Megaphone,
    color: "text-sky-500",
    bgColor: "bg-sky-900/20",
  },
  {
    id: "not_looking",
    name: "Не ищу работу",
    description: "Соискатель не заинтересован в поиске работы.",
    icon: MinusCircle,
    color: "text-gray-500",
    bgColor: "bg-gray-900/20",
  },
];

export const getApplicantActivityStatusById = (
  id: string
): ApplicantActivityStatus | undefined => {
  return APPLICANT_ACTIVITY_STATUSES.find((status) => status.id === id);
};
