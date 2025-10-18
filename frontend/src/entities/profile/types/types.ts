export const enum EProfileRoles {
  UNIVERSITY = "University",
  ADMIN = "Admin",
  COMPANY = "Company",
}

export interface Profile {
  id: 0;
  email: string;
  full_name: string;
  image_url: string;
  cv_file: string;
  role: EProfileRoles;
  company_id: number;
  university_id: number;
}

export interface ApplicantActivityStatus {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

export interface Company {
  id: number;
  name: string;
  icon_url: string;
  site_url: string;
  industry: string;
}
