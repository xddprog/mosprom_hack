import { cn } from "@/shared/lib/utils/twMerge";
import { PropsWithChildren } from "react";

export const Container = ({
  children,
  className,
}: PropsWithChildren & { className: string }) => {
  return (
    <div className={cn("mx-auto max-w-[1280px] w-full", className)}>
      {children}
    </div>
  );
};
