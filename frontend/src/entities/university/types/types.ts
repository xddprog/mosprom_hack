export interface UniversityData {
  universityName: string;
  groupName: string;
  course: number;
}

export interface UniversitySuggest {
  value: string;
  unrestricted_value: string;
  data: {
    address: string;
    inn: string;
    orgn: string;
    okpo: string;
  };
}

export interface Student {
  id: number;
  name: string;
  imageUrl: string;
  course: number;
  skills: string[];
  groupName: string;
  githubUrl: string;
  cv_file?: string;
  initialRating: number;
  recommended?: boolean;
  recommendedComment?: string;
}
