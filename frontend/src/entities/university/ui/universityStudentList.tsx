import React from "react";
import { CreateVacancyCard } from "@/widgets/vacancyCard/vacancyCard";
import { StudentCard } from "./universityStudentCard";
import { cn } from "@/shared/lib/utils/twMerge";
import { Student } from "../types/types";

interface UniversityStudentListProps {
  students: Array<Student>;
  className?: string;
  cardClassName?: string;
  onDeleteStudent: (studentId: number) => void;
  onCreateStudent: () => void;
}

export const UniversityStudentList: React.FC<UniversityStudentListProps> = ({
  className,
  students,
  cardClassName,
  onCreateStudent,
  onDeleteStudent,
}) => {
  return (
    <div className={cn("p-8 rounded-3xl", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CreateVacancyCard onClick={onCreateStudent} />
        {students &&
          students?.length > 0 &&
          students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              className={cardClassName}
              onDelete={() => onDeleteStudent(student.id)}
            />
          ))}
      </div>
    </div>
  );
};
