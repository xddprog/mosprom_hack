export const enum EAuthRoles {
  UNIVERSITY = "UNIVERSITY",
  COMPANY = "COMPANY",
  APPLICANT = "APPLICANT",
  ADMIN = "ADMIN",
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  role: EAuthRoles;
}

export interface AuthResponse {
  id: 0;
  email: string;
  username: string;
  image_url: string;
  cv_file: string;
  is_admin: boolean;
}
