import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "accent" | "outline" | "new" | "soldout";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-xs font-heading font-semibold uppercase tracking-wider",
        variant === "default" && "bg-white/10 text-ascend-white",
        variant === "accent" && "bg-ascend-accent text-white",
        variant === "outline" && "border border-white/20 text-ascend-white",
        variant === "new" && "bg-ascend-accent text-white",
        variant === "soldout" && "bg-red-600 text-white",
        className
      )}
      {...props}
    />
  );
}
