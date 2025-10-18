import { Tag } from "@/entities/vacancy/types/types";

export interface UniversityData {
  universityName: string;
  groupName: string;
  course: number;
}

export interface UniversitySuggest {
  id: number;
  name: string;
}

export interface Student {
  id: number;
  full_name: string;
  email: string;
  age: number;
  phone_number: string;
  tags: Array<Tag>;
  resume_link: string;
  course_number: number;
  faculty: string;
  university_id: number;
}

export interface CreateStudentDto {
  full_name: string;
  email: string;
  age: number;
  phone_number?: string;
  course_number: number;
  faculty: string;
  tags?: number[];
  resume: File;
}
