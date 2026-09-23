import { cn } from '@/lib/utils'
import React from 'react'


interface ButtonProps {
    text: string
    className?: string
}

const Button = ({ text, className }: ButtonProps) => {
    return (
        <div className={cn("bg-black px-15.5 md:py-5 p-3 rounded-[10px] text-white shadow-[0_20px_35px_0_rgba(0,0,0,0.15)] w-max cursor-pointer md:text-[16px] text-[14px]", className)}>
            {text}
        </div>
    )
}

export default Button