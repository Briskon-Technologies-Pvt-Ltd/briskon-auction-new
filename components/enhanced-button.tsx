"use client"

import type React from "react"

import { Button as BaseButton } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface EnhancedButtonProps extends React.ComponentProps<typeof BaseButton> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "white" | "outline-white"
  size?: "default" | "sm" | "lg" | "icon"
  children: React.ReactNode
}

const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className, variant = "default", size = "default", children, ...props }, ref) => {
    const baseClasses =
      "relative inline-flex items-center justify-center whitespace-nowrap rounded-lg font-semibold transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

    const variants = {
      default:
        "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
      outline:
        "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm hover:shadow-md transform hover:-translate-y-0.5",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
      white:
        "bg-white text-gray-900 border-2 border-white hover:bg-gray-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold",
      "outline-white":
        "border-3 border-white text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm bg-white/10 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold",
    }

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-12 rounded-lg px-8 text-lg",
      icon: "h-10 w-10",
    }

    return (
      <BaseButton className={cn(baseClasses, variants[variant], sizes[size], className)} ref={ref} {...props}>
        {children}
      </BaseButton>
    )
  },
)

EnhancedButton.displayName = "EnhancedButton"

export { EnhancedButton }
