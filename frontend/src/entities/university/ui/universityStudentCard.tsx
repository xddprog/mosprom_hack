import { cn } from "@/shared/lib/utils/twMerge";
import { Label } from "@/shared/ui/label/label";
import { Student } from "../types/types";
import { Image } from "@/shared/ui";
import { Badge } from "@/shared/ui/badge/ui/badge";
import { ReactNode } from "react";

interface UniversityStudentCardProps {
  student: Student;
  requiredSkills: string[];
  deleteAction?: ReactNode;
  sendAction?: ReactNode;
}

export const UniversityStudentCard = ({
  student,
  requiredSkills,
  deleteAction,
  sendAction,
}: UniversityStudentCardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col relative items-start gap-3 p-3 rounded-xl border w-full bg-neutral-800 border-neutral-700"
      )}
    >
      {deleteAction}
      <Label
        htmlFor={`student-${student.id}`}
        className="flex-1 cursor-pointer flex items-center gap-3"
      >
        <Image
          src={student.imageUrl}
          alt={student.name}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-white">{student.name}</p>
          <p className="text-zinc-400 text-xs">
            {student.groupName} - {student.course} курс
          </p>
          <div className="flex flex-wrap gap-1 mt-1">
            {student.skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className={cn(
                  "text-xs px-2 py-0.5",
                  requiredSkills.includes(skill)
                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                    : "bg-neutral-700 text-zinc-400"
                )}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </Label>
      {sendAction}
    </div>
  );
};
