import { Trash2 } from "lucide-react";
import { Student } from "../types/types";
import { TagGroup } from "@/shared/ui/badge/ui/badgeGroup";
import { cn } from "@/shared/lib/utils/twMerge";

interface StudentCardProps {
  student: Student;
  className?: string;
  onDelete?: () => void;
}

export function StudentCard({
  student,
  className,
  onDelete,
}: StudentCardProps) {
  return (
    <div
      className={cn(
        "bg-white relative text-black rounded-3xl justify-around p-4 flex flex-col gap-3 shadow-md min-h-[140px]",
        className
      )}
    >
      {onDelete && (
        <button
          onClick={onDelete}
          className="absolute top-3 right-3 p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          aria-label="Удалить студента"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      )}

      <h2 className="text-xl mb-4 pr-12">{student.full_name}</h2>

      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-sm text-gray-700">
          {student.course_number} курс
        </span>

        <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-sm text-gray-700">
          {student.faculty}
        </span>

        <TagGroup
          className="text-xs"
          tags={student.tags}
          variant="outline"
          size="md"
        />
      </div>
    </div>
  );
}
