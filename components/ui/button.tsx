import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-medium transition hover:bg-[#333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-black text-white shadow-[0_20px_35px_0_rgba(0,0,0,0.15)]",
        destructive: "bg-[#f13b3b] text-white shadow-[0_20px_35px_0_rgba(0,0,0,0.15)] hover:bg-[#d92f2f]",
        outline: "border border-[#e6e6e6] bg-white text-[#484848] shadow-none hover:bg-[#f6f6f6] hover:text-black",
        secondary: "bg-[#f6f6f6] text-[#484848] shadow-none hover:bg-[#eee] hover:text-black",
        ghost: "text-[#484848] shadow-none hover:bg-[#f6f6f6] hover:text-black",
        link: "text-[#484848] underline-offset-4 shadow-none hover:text-black hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
