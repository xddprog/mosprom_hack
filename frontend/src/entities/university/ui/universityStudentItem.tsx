import { Image } from "@/shared/ui";
import { Student } from "../types/types";
import { TagGroup } from "@/shared/ui/badge/ui/badgeGroup";
import { IconButton } from "@/shared/ui/button/iconButton";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UniversityStudentItemProps {
  isNavigable?: boolean;
  student: Student;
}

export const UniversityStudentItem = ({
  isNavigable = true,
  student,
}: UniversityStudentItemProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => navigate(`student/${student.id}`);

  return (
    <div className="bg-neutral-900 text-gray-800 rounded-3xl p-4 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={student.imageUrl}
            alt={student.name}
            width={48}
            height={48}
            className="rounded-full object-cover border-2 border-blue-500"
          />
          <div>
            <p className="font-semibold text-sm text-zinc-500">
              {student.groupName}
            </p>
            <p className="font-semibold text-sm text-zinc-500">
              {student.course} курс
            </p>
          </div>
        </div>
        <a
          href={student.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 transition-colors duration-200 text-sm font-medium"
        >
          GitHub
        </a>
      </div>

      <div>
        <h3 className="text-xl font-bold text-zinc-300">{student.name}</h3>
      </div>

      <section className="flex justify-between items-center mt-auto">
        <TagGroup tags={student.skills} variant="outline" size="md" />

        {isNavigable && (
          <IconButton
            value={student.id}
            ariaLabel="Перейти к профилю студента"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-md"
            onClick={handleNavigate}
          >
            <ChevronRight className="w-5 h-5" />
          </IconButton>
        )}
      </section>
    </div>
  );
};
