import { Vacancy } from "@/entities/vacancy/types/types";

export interface Candidate {
  id: string;
  title: string;
  vacancy: Vacancy;
  assignee: string;
  match: number;
  dueDate: string;
  priority: "low" | "medium" | "high";
}
