import { studentsMock } from "../lib/constants";
import { UniversityStudentItem } from "./universityStudentItem";

export const UniversityStudents = () => {
  return (
    <div className="space-y-4">
      {studentsMock.map((student) => (
        <UniversityStudentItem key={student.id} student={student} />
      ))}
    </div>
  );
};
