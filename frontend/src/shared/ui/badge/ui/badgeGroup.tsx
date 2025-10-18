import { cn } from "@/shared/lib/utils/twMerge";
import { TagChip } from "./badgeChip";
import { Tag } from "@/entities/vacancy/types/types";

export type TagChipProps = {
  children: React.ReactNode;
  variant?: "glassLight" | "solidDark" | "outline";
  size?: "sm" | "md";
  className?: string;
  onClick?: () => void;
};

export const TagGroup: React.FC<{
  tags: Array<Tag>;
  variant?: TagChipProps["variant"];
  size?: TagChipProps["size"];
  wrap?: boolean;
  className?: string;
  onTagClick?: (name: string) => void;
}> = ({
  tags,
  variant = "glassLight",
  size = "sm",
  wrap = true,
  className,
  onTagClick = () => {},
}) => {
  return (
    <div className={cn(wrap ? "flex flex-wrap" : "flex", className)}>
      {tags.map((t) => (
        <TagChip
          key={t.id}
          variant={variant}
          size={size}
          onClick={() => onTagClick(t.name)}
        >
          {t.name}
        </TagChip>
      ))}
    </div>
  );
};
