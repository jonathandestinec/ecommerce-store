import React from 'react'


interface ButtonProps {
    text: string
    className?: string
}

const Button = ({ text, className }: ButtonProps) => {
    return (
        <div className={`bg-black px-11.25 py-5 rounded-[10px] text-white shadow-[0_20px_35px_0_rgba(0,0,0,0.15)] w-max ${className}`}>
            {text}
        </div>
    )
}

export default Button