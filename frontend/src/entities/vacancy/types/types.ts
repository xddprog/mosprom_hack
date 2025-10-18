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
  company_id: string;
  region: string;
  post: string;
  salary: string;
  tags: string[];
  is_favorite: boolean;
  responsibilities: VacancySection;
  requirements: VacancySection;
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

export interface Vacancy {
  id: number;
  company: Company;
  region: string;
  post: string;
  salary: string;
  tags: Array<string>;
  isFavorite: boolean;
  responsibilities: VacancySection;
  requirements: VacancySection;
}

export type ExperienceType = "no-experience" | "1-3" | "3-6" | "more-6" | null;

export type WorkFormat = "office" | "remote" | "hybrid" | null;

export interface VacancyFilter {
  salaryMin: number | "";
  salaryMax: number | "";
  experience: ExperienceType;
  workFormat: WorkFormat;
  region: string;
}
