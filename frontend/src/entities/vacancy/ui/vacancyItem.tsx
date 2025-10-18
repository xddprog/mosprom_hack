import { Heart } from "lucide-react";
import { Vacancy } from "../types/types";
import { cn } from "@/shared/lib/utils/twMerge";
import { Image } from "@/shared/ui";
import { TagGroup } from "@/shared/ui/badge/ui/badgeGroup";
import { ReactNode } from "react";
import { TagChip } from "@/shared/ui/badge/ui/badgeChip";

interface VacancyItemProps {
  vacancy: Vacancy;
  isFavoriteIcon?: boolean;
  isTag?: boolean;
  action: ReactNode;
  footerAction?: ReactNode;
  onClick?: (vacancyId: number) => void;
}

export const VacancyItem = ({
  vacancy,
  isTag = true,
  isFavoriteIcon = true,
  footerAction,
  action,
  onClick = () => {},
}: VacancyItemProps) => {
  return (
    <div
      className="bg-white text-black rounded-3xl justify-around p-4 flex flex-col gap-3 shadow-md min-h-[140px]"
      onClick={() => onClick(vacancy.id)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div>
            <h3 className="text-2xl font-medium">{vacancy.post}</h3>
          </div>
        </div>
        <div className="flex items-center">
          <TagChip
            variant={"glassLight"}
            size={"md"}
            className="space-x-2 text-sm"
          >
            {vacancy.salary}
          </TagChip>

          {isFavoriteIcon && (
            <button>
              <Heart
                className={cn(
                  "w-5 h-5",
                  vacancy.isFavorite
                    ? "fill-[#D00E46] text-[#D00E46]"
                    : "text-gray-400"
                )}
              />
            </button>
          )}
        </div>
      </div>

      <section className="flex justify-between items-center">
        {isTag && (
          <div className="flex">
            <TagChip variant={"glassLight"} size={"md"} className="space-x-2">
              <Image
                src={vacancy.company.icon_url}
                alt={vacancy.company.name}
                width={20}
                height={20}
                className="rounded-md object-cover"
              />
              <p className="font-semibold text-sm text-zinc-500">
                {vacancy.company.name}
              </p>
            </TagChip>
            <TagGroup tags={vacancy.tags} variant="glassLight" size="md" />
          </div>
        )}
        {footerAction}
        <div className="flex">{action}</div>
      </section>
    </div>
  );
};
