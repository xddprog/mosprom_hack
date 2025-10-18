import { modalSelectors } from "@/entities/modal/model/store/modalSlice";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { EModalVariables } from "@/shared/lib/utils/modalVariables";
import { Button, Image } from "@/shared/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog/dialog";
import { useState } from "react";
import { InternshipListing } from "@/entities/vacancy/types/types";
import { useActions } from "@/shared/hooks/useActions";
import { Label } from "@/shared/ui/label/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select/select";
import { Checkbox } from "@/shared/ui/checkbox/checkbox";
import { Badge } from "@/shared/ui/badge/ui/badge";
import { cn } from "@/shared/lib/utils/twMerge";
import { studentsMock } from "../lib/constants";

export const UniversityAttachInternshipModal = () => {
  const isOpen = useAppSelector(modalSelectors.isOpen);
  const type = useAppSelector(modalSelectors.selectType);
  const { listing } = useAppSelector(modalSelectors.data) as {
    listing: InternshipListing;
  };

  const { toggleModal } = useActions();

  const isModalOpen =
    isOpen && type === EModalVariables.ATTACH_STUDENT_ON_INTERNSHIP;

  const [selectedStudents, setSelectedStudents] = useState<Set<number>>(
    new Set(listing.attachedStudents)
  );

  const availableSlots = listing?.availableSlots || 0;
  const currentAttachedCount = selectedStudents.size;
  const canAddMore = currentAttachedCount < availableSlots;

  const handleCheckboxChange = (studentId: number, isChecked: boolean) => {
    setSelectedStudents((prev) => {
      const newSet = new Set(prev);
      if (isChecked && canAddMore) {
        newSet.add(studentId);
      } else if (!isChecked) {
        newSet.delete(studentId);
      }
      return newSet;
    });
  };

  const handleSave = () => {
    console.log("сохранение набора, у hr отображает список");
    toggleModal(false);
  };

  const handleClose = () => {
    toggleModal(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-neutral-900 text-white border-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl text-center">
            Прикрепить студентов к {listing.position}
          </DialogTitle>
          <DialogDescription className="text-zinc-400 flex justify-center">
            Доступно
            <span className="font-bold text-white px-1">{availableSlots}</span>
            мест. Выбрано:
            <span className="font-bold text-indigo-300 px-1">
              {currentAttachedCount}
            </span>
            из
            <span className="font-bold text-white px-1">{availableSlots}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2 pr-2">
          <div className="flex items-center gap-4">
            <Select
              onValueChange={() =>
                console.log("запрос на бэкэнд с фильтрацией")
              }
              defaultValue="all"
            >
              <SelectTrigger
                id="skill-filter"
                className="w-full rounded-xl bg-neutral-900 border-zinc-700 text-zinc-300 text-[13px] focus:ring-1 focus:ring-indigo-500 py-5 px-3"
              >
                <SelectValue placeholder="Все навыки" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-zinc-700 text-zinc-300 rounded-xl">
                <SelectItem value="all">Все навыки</SelectItem>
                {listing.requiredSkills.map((skill) => (
                  <SelectItem key={skill} value={skill} className="p-2">
                    {skill}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studentsMock.length > 0 ? (
              studentsMock.map((student) => (
                <div
                  key={student.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border w-full",
                    selectedStudents.has(student.id)
                      ? "bg-indigo-900/30 border-indigo-600"
                      : "bg-neutral-800 border-neutral-700",
                    !canAddMore &&
                      !selectedStudents.has(student.id) &&
                      "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Checkbox
                    id={`student-${student.id}`}
                    checked={selectedStudents.has(student.id)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(student.id, checked as boolean)
                    }
                    disabled={!canAddMore && !selectedStudents.has(student.id)}
                    className="data-[state=checked]:bg-indigo-600 data-[state=checked]:text-white border-neutral-600"
                  />
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
                              listing.requiredSkills.includes(skill)
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
                </div>
              ))
            ) : (
              <p className="col-span-2 text-center text-zinc-500">
                Нет подходящих студентов.
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSave}
            disabled={!listing || currentAttachedCount > availableSlots}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full"
          >
            Сохранить ({currentAttachedCount})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
