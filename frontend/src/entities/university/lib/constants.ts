import { InternshipListing } from "@/entities/vacancy/types/types";
import { Student } from "../types/types";

export const studentsMock: Student[] = [
  {
    id: 1,
    name: "Иван Иванов",
    imageUrl: "/images/mock-danya.png",
    course: 2,
    skills: ["JavaScript", "React", "Node.js"],
    groupName: "ИБ-201",
    githubUrl: "https://github.com/flavokrkkk",
    initialRating: 0,
    cv_file: "/files/mock-cv.pdf",
  },
  {
    id: 2,
    name: "Анна Смирнова",
    imageUrl: "/images/mock-danya.png",
    course: 3,
    skills: ["Python", "Django", "PostgreSQL"],
    groupName: "ПИ-302",
    githubUrl: "https://github.com/annas",
    initialRating: 0,
  },
  {
    id: 3,
    name: "Петр Сидоров",
    imageUrl: "/images/mock-danya.png",
    course: 4,
    skills: ["Java", "Spring Boot", "Kafka"],
    groupName: "ИВТ-401",
    githubUrl: "https://github.com/petrs",
    initialRating: 0,
  },
];

export const internshipListingsMock: InternshipListing[] = [
  {
    id: "i1",
    companyName: "Яндекс",
    position: "Frontend Разработчик",
    requiredSkills: ["JavaScript", "React", "TypeScript", "Redux"],
    availableSlots: 5,
    attachedStudents: [1],
    status: "open",
    deadline: "2024-03-15",
  },
  {
    id: "i2",
    companyName: "VK",
    position: "Backend Разработчик (Python)",
    requiredSkills: ["Python", "Django", "FastAPI", "PostgreSQL"],
    availableSlots: 3,
    attachedStudents: [],
    status: "open",
    deadline: "2024-04-01",
  },
  {
    id: "i3",
    companyName: "Сбер",
    position: "Java Разработчик",
    requiredSkills: ["Java", "Spring Boot", "Kafka", "Docker"],
    availableSlots: 4,
    attachedStudents: [3, 5],
    status: "open",
    deadline: "2024-03-20",
  },
  {
    id: "i4",
    companyName: "Ozon",
    position: "UI/UX Дизайнер",
    requiredSkills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    availableSlots: 2,
    attachedStudents: [4],
    status: "closed",
    deadline: "2024-02-28",
  },
];
