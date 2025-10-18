export interface Company {
  id: string;
  name: string;
  icon_url: string;
  industry: string;
  site_url: string;
}

export interface VacancySection {
  title: string;
  description: string[];
}

export interface CreateVacancyDto {
  title: string;
  min_salary: number;
  max_salary: number;
  experience: string;
  region: string;
  tags: Array<number>;
  work_format: WorkFormat;
  responsibilities: string[];
  requirements: string[];
  conditions: string[];
  is_internship: boolean;
}

export type InternshipListing = {
  id: string;
  companyName: string;
  position: string;
  requiredSkills: string[];
  availableSlots: number;
  attachedStudents: number[];
  status: "open" | "closed";
  deadline: string;
};

export type WorkFormat = "Office" | "Remote" | "Hybrid" | null;

export interface Vacancy {
  id: number;
  title: string;
  min_salary: number;
  max_salary: number;
  experience: undefined;
  region: string;
  tags: Tag[];
  work_format: WorkFormat;
  responsibilities: string[];
  requirements: string[];
  conditions: string[];
  is_internship: boolean;
  company: Company;
}

export type ExperienceType = "no-experience" | "1-3" | "3-6" | "more-6" | null;

export interface VacancyFilter {
  salaryMin: number | "";
  salaryMax: number | "";
  experience: ExperienceType;
  workFormat: WorkFormat;
  region: string;
}

export interface Tag {
  id: number;
  name: string;
}
