import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "accent";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ascend-accent disabled:pointer-events-none disabled:opacity-50 font-heading uppercase tracking-wider",
          variant === "default" && "bg-ascend-accent text-white hover:bg-ascend-accent-dark hover:shadow-lg hover:shadow-ascend-accent/20",
          variant === "outline" && "border border-white/20 bg-transparent text-ascend-white hover:border-ascend-accent hover:text-ascend-accent",
          variant === "ghost" && "text-ascend-white hover:text-ascend-accent hover:bg-white/5",
          variant === "link" && "text-ascend-accent underline-offset-4 hover:underline",
          variant === "accent" && "bg-ascend-accent text-white hover:bg-ascend-accent-dark",
          size === "default" && "h-11 px-6 py-2.5",
          size === "sm" && "h-9 px-4 text-xs",
          size === "lg" && "h-13 px-10 text-base",
          size === "icon" && "h-10 w-10",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
