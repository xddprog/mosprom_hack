import { useActions } from "@/shared/hooks/useActions";
import { EModalVariables } from "@/shared/lib/utils/modalVariables";
import { cn } from "@/shared/lib/utils/twMerge";
import { Button } from "@/shared/ui";
import { Input } from "@/shared/ui/input";
import { UniversityStudentList } from "./universityStudentList";
import {
  useDeleteStudent,
  useUniversityStudents,
} from "../hooks/useUniversitySuggestions";

export const UniversityStudentsContent = () => {
  const { setOpenModal } = useActions();

  const { data: students = [] } = useUniversityStudents();
  const { mutate: deleteStudent } = useDeleteStudent();

  const handleUniversityCreateModal = () => {
    setOpenModal({
      isOpen: true,
      type: EModalVariables.UNIVERSITY_CREATE_MODAL,
    });
  };

  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex w-full space-x-2">
        <Input
          placeholder="Ключевые слова"
          className="w-full p-6 rounded-3xl bg-white border focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
        />
        <div>
          <Button
            variant={"outline"}
            className={cn(
              "p-6 rounded-3xl w-full bg-[#D00E46] hover:bg-[#D00E46] text-white hover:text-white"
            )}
          >
            Фильтры
          </Button>
        </div>
      </div>
      <div>
        <UniversityStudentList
          students={students}
          className="bg-zinc-50"
          cardClassName="bg-zinc-100"
          onDeleteStudent={(student_id) => deleteStudent({ student_id })}
          onCreateStudent={handleUniversityCreateModal}
        />
      </div>
    </div>
  );
};
