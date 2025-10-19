import { useActions } from "@/shared/hooks/useActions";
import { UniversityStudentList } from "./universityStudentList";
import { EModalVariables } from "@/shared/lib/utils/modalVariables";
import { useState } from "react";
import { Student } from "../types/types";

export const UniversityVacancyForm = () => {
  const [selectStudents, setSelectStudents] = useState<Array<Student>>([]);
  const { setOpenModal } = useActions();

  const handleAddStudent = (student: Student) =>
    setSelectStudents((prev) => [...prev, student]);

  const handleOpenAttachModal = () =>
    setOpenModal({
      isOpen: true,
      type: EModalVariables.ATTACH_STUDENT_ON_INTERNSHIP,
      data: { onAddStudent: handleAddStudent },
    });

  return (
    <div>
      <h1 className="text-2xl">Подать анкеты студентов</h1>
      <UniversityStudentList
        cardClassName="bg-zinc-100"
        students={selectStudents}
        onDeleteStudent={() => {}}
        onCreateStudent={handleOpenAttachModal}
      />
    </div>
  );
};
