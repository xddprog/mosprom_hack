import { UniversityData } from "@/entities/university/types/types";

export interface Profile {
  id: number;
  email: string;
  username: string;
  image_url: string;
  cv_file: string;
  is_admin: true;
  activity_status_id: string;
  university: UniversityData;
}

export interface ApplicantActivityStatus {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}
