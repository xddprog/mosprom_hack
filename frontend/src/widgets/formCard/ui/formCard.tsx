import { cn } from "@/shared/lib/utils/twMerge";
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  icon?: React.ReactNode;
  description?: string;
}

export const FormCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, title, icon, description, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6 shadow-sm",
        className
      )}
      {...props}
    >
      {(title || icon || description) && (
        <div className="flex items-start gap-2 mb-4">
          {/* {icon && <span className="text-blue-500 mt-0.5">{icon}</span>}{" "} */}
          <div>
            {title && (
              <h4 className="text-xl font-semibold text-zinc-200">{title}</h4>
            )}
            {description && (
              <p className="text-sm text-zinc-400">{description}</p>
            )}
          </div>
        </div>
      )}
      {children}
    </div>
  )
);
