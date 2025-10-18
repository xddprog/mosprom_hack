import { cn } from "@/shared/lib/utils/twMerge";
import { TagChipProps } from "../types/types";

export const TagChip: React.FC<TagChipProps> = ({
  children,
  variant = "glassLight",
  size = "sm",
  className,
}) => {
  const base = "rounded-full inline-flex items-center whitespace-nowrap";
  const sizeCls = {
    sm: "text-xs h-7 px-3",
    md: "text-sm h-9 px-4",
  }[size];

  const variantCls = {
    glassLight: "bg-[#F0F3F7] text-black",
    solidDark: "bg-neutral-800 text-gray-300",
    outline: "border bg-white border-white/20 text-zinc-600",
  }[variant];

  return (
    <span className={cn(base, sizeCls, variantCls, className)}>{children}</span>
  );
};
