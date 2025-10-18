import React, { ReactNode } from "react";
import { InternshipListing } from "@/entities/vacancy/types/types";
import { cn } from "@/shared/lib/utils/twMerge";
import { Badge } from "@/shared/ui/badge/ui/badge";
import { Image } from "@/shared/ui";
import { TagGroup } from "@/shared/ui/badge/ui/badgeGroup";

interface InternshipCardProps {
  listing: InternshipListing;
  footerCard: ({
    isFull,
    isClosed,
  }: {
    isClosed: boolean;
    isFull: boolean;
  }) => ReactNode;
}

export const InternshipCard: React.FC<InternshipCardProps> = ({
  listing,
  footerCard,
}) => {
  const attachedStudentsCount = listing.attachedStudents.length;
  const remainingSlots = listing.availableSlots - attachedStudentsCount;
  const isFull = remainingSlots <= 0;
  const isClosed = listing.status === "closed";

  return (
    <div
      className={cn(
        "relative bg-neutral-900 text-white rounded-3xl p-6 flex flex-col gap-5 shadow-lg transition-all duration-300",
        isClosed ? "opacity-70 grayscale" : "hover:shadow-xl"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={
              "https://www.bbrc.ru/upload/uf/bed/9k2g701j6drmo4e8f086qhcvcfof6aoa/Yandex_icon.svg.png"
            }
            alt={listing.companyName}
            className="w-14 h-14"
          />
          <div>
            <h3 className="text-xl font-bold">{listing.companyName}</h3>
            <p className="text-zinc-400 text-sm">{listing.position}</p>
          </div>
        </div>
        <Badge
          className={cn(
            "px-3 py-1 text-xs font-semibold",
            isFull ? "bg-red-600" : "bg-blue-600",
            isClosed && "bg-gray-700"
          )}
        >
          {isClosed ? "Закрыт" : isFull ? "Мест нет" : `${remainingSlots} мест`}
        </Badge>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-zinc-400 text-sm flex items-center gap-2">
          Крайний срок:{" "}
          <span className="font-medium text-white">
            {new Date(listing.deadline).toLocaleDateString()}
          </span>
        </p>
        <div className="text-zinc-400 text-sm">
          <TagGroup
            tags={listing.requiredSkills}
            variant="solidDark"
            size="md"
          />
        </div>
      </div>

      {footerCard({ isFull, isClosed })}
    </div>
  );
};
