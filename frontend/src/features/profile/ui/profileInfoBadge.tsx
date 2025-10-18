import { Profile } from "@/entities/profile/types/types";
import { Image } from "@/shared/ui";
import { Pen, UserRound } from "lucide-react";
import {
  APPLICANT_ACTIVITY_STATUSES,
  getApplicantActivityStatusById,
} from "../lib/constants";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select/select";
import { cn } from "@/shared/lib/utils/twMerge";

interface IProfileInfoBadgeProps {
  onClick: () => void;
  currentProfile: Profile;
}

export const ProfileInfoBadge = ({
  currentProfile,
  onClick,
}: IProfileInfoBadgeProps) => {
  const activeStatus = getApplicantActivityStatusById(
    currentProfile.activity_status_id
  );

  const handleStatusSelect = (statusId: string) => {
    console.log(statusId);
  };

  return (
    <div className="bg-neutral-900 rounded-3xl p-4 flex justify-between items-start h-[124px] relative">
      <div className="flex space-x-4">
        {currentProfile.image_url ? (
          <Image
            width={96}
            height={96}
            alt="avatar"
            src={currentProfile.image_url}
            className="rounded-xl object-cover"
          />
        ) : (
          <div className="h-24 w-24 bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-400">
            <UserRound className="h-16 w-16" />
          </div>
        )}

        <div className="flex flex-col justify-between pt-1">
          <p className="font-medium text-xl text-zinc-200 pl-2">
            {currentProfile.username}
          </p>
          <div className="flex space-x-2 items-center">
            <Select
              defaultValue={activeStatus?.id}
              onValueChange={handleStatusSelect}
            >
              <SelectTrigger
                className={cn(
                  "w-full rounded-xl bg-neutral-900 border-zinc-700 text-zinc-300 text-[13px] focus:ring-1 focus:ring-indigo-500 py-5 px-2",
                  activeStatus?.id && "data-[state=closed]:border-neutral-900"
                )}
              >
                <SelectValue placeholder="Выбрать роль" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-zinc-700 text-zinc-300 rounded-xl">
                {APPLICANT_ACTIVITY_STATUSES.map((status) => (
                  <SelectItem
                    key={status.id}
                    value={status.id}
                    className="p-2.5"
                  >
                    <status.icon className={`h-4 w-4 ${status.color}`} />
                    <span>{status.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <button
        className="text-gray-400 hover:text-white border-zinc-600 border cursor-pointer bg-zinc-800 flex items-center rounded-full p-2 transition-colors duration-200"
        onClick={onClick}
      >
        <Pen className="h-4 w-4 ml-0.5" />
      </button>
    </div>
  );
};
