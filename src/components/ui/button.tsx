import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary" | "link" | "gold";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-xs font-medium uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          variant === "default" && "bg-[#4A1521] text-[#FAF7F2] hover:bg-[#631828] shadow-sm",
          variant === "outline" && "border border-[#8B3A2B]/20 bg-white/50 hover:bg-[#8B3A2B]/10 text-[#4A1521] hover:border-[#8B3A2B]/40 shadow-xs",
          variant === "ghost" && "hover:bg-[#8B3A2B]/10 text-[#4A1521]",
          variant === "secondary" && "bg-[#F5EDE4] text-[#4A1521] hover:bg-[#EBDDCF]",
          variant === "gold" && "bg-gradient-to-r from-[#D4AF37] to-[#B89028] text-[#1A1412] font-semibold hover:shadow-md",
          size === "default" && "h-9 px-4 py-2",
          size === "sm" && "h-8 rounded-md px-2.5 text-[11px]",
          size === "lg" && "h-11 rounded-full px-8 text-xs font-semibold",
          size === "icon" && "h-9 w-9",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

