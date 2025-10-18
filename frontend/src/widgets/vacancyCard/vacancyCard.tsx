import { cn } from "@/shared/lib/utils/twMerge";
import { Button } from "@/shared/ui";
import { Plus } from "lucide-react";

interface VacancyCardProps {
  onClick: () => void;
  className?: string;
}

export const CreateVacancyCard: React.FC<VacancyCardProps> = ({
  onClick,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center p-6 rounded-2xl bg-white border-2 border-dashed border-rose-300 cursor-pointer transition-colors hover:border-rose-400 hover:bg-rose-50 min-h-[180px] md:min-h-[140px]",
        className
      )}
      onClick={onClick}
    >
      <Button
        type="button"
        variant="ghost"
        className="h-14 w-14 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors text-white shadow-lg"
        onClick={onClick}
      >
        <Plus className="h-8 w-8" />
      </Button>
    </div>
  );
};
