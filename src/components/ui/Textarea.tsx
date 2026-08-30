import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-ascend-white placeholder:text-ascend-gray/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ascend-accent/50 focus-visible:border-ascend-accent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 font-body resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
