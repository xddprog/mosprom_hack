import { cn } from "@/shared/lib/utils/twMerge";
import { TagChip } from "./badgeChip";

export type TagChipProps = {
  children: React.ReactNode;
  variant?: "glassLight" | "solidDark" | "outline";
  size?: "sm" | "md";
  className?: string;
};

export const TagGroup: React.FC<{
  tags: Array<string | number>;
  variant?: TagChipProps["variant"];
  size?: TagChipProps["size"];
  wrap?: boolean;
  className?: string;
}> = ({
  tags,
  variant = "glassLight",
  size = "sm",
  wrap = true,
  className,
}) => {
  return (
    <div className={cn(wrap ? "flex flex-wrap" : "flex", className)}>
      {tags.map((t) => (
        <TagChip key={String(t)} variant={variant} size={size}>
          {t}
        </TagChip>
      ))}
    </div>
  );
};
