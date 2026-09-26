import { cn } from '@/lib/utils'
import React from 'react'


interface ButtonProps {
    text: string
    className?: string
    type?: 'button' | 'submit' | 'reset'
    onClick?: () => void
    disabled?: boolean
}

const Button = ({ text, className, type = 'button', onClick, disabled = false }: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={cn("bg-black px-15.5 md:py-5 p-3 rounded-[10px] text-white shadow-[0_20px_35px_0_rgba(0,0,0,0.15)] w-max cursor-pointer md:text-[16px] text-[14px] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-50", className)}
        >
            {text}
        </button>
    )
}

export default Button
