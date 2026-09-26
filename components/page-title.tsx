import { cn } from '@/lib/utils'
import { volkhov } from '@/styles/fonts'
import React from 'react'
import Link from 'next/link'

interface PageTitleProps {
  title: string
}

const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <div>

      <h1 className={cn('text-[34px] leading-tight text-center mt-10 md:mt-10', volkhov.className)}>
        {title}
      </h1>

      <div className='mx-auto mt-2 flex w-max items-center gap-2 text-xs text-[#777]'>
        <Link href="/" className="hover:text-black">Home</Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page" className="text-[#333]">{title}</span>

      </div>

    </div>
  )
}

export default PageTitle
