import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-ascend-white placeholder:text-ascend-gray/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ascend-accent/50 focus-visible:border-ascend-accent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 font-body",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
