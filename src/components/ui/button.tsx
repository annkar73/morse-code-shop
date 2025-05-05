import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"
import React from "react"

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export function Button({ asChild = false, className, ...props }: IButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
        "bg-[var(--color-green-dark)] text-white",
        "hover:brightness-110 transition-colors duration-200",
        "hover:scale-105",
        "hover:shadow-lg",
        "transition-transform duration-200",
        "disabled:opacity-50 disabled:pointer-events-none",
        "cursor-pointer",
        "shadow-md",
        className
      )}
      {...props}
    />
  )
}
