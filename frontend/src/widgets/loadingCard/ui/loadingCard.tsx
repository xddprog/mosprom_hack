import { cn } from "@/shared/lib/utils/twMerge";
import { Loader2Icon } from "lucide-react";

interface LoadingCardProps {
  className: string;
}

export const LoadingCard = ({ className }: LoadingCardProps) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Loader2Icon className="animate-spin h-10 w-10 text-blue-400" />
    </div>
  );
};
