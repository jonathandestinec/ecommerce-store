import { cn } from '@/lib/utils'
import { volkhov } from '@/styles/fonts'
import { ChevronRight } from 'lucide-react'
import React from 'react'

interface PageTitleProps {
  title: string
}

const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <div>

      <h1 className={cn('text-[42px] leading-8 text-center mt-10 md:mt-19.5', volkhov.className)}>
        {title}
      </h1>

      <div className='w-max ml-auto mr-auto flex items-center justify-between gap-[15.34] mt-[21.75px]'>

        <h5>Home</h5>

        <svg width="7" height="9" viewBox="0 0 7 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.194862 0.0705806L0.0705674 0.194858C-0.0118037 0.277229 -0.0118037 0.410788 0.0705674 0.493176L3.50697 3.92959L0.0705674 7.36601C-0.0118037 7.44838 -0.0118037 7.58194 0.0705674 7.66433L0.194862 7.78861C0.277233 7.87098 0.410792 7.87098 0.493163 7.78861L4.20304 4.07874C4.28542 3.99637 4.28542 3.86281 4.20304 3.78043L0.493163 0.0705806C0.410792 -0.0118081 0.277233 -0.0118081 0.194862 0.0705806Z" fill="black" stroke="black" strokeWidth="0.0175781" />
        </svg>


        <h3>{title}</h3>

      </div>

    </div>
  )
}

export default PageTitle