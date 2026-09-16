import Button from '@/components/button'
import Nav from '@/components/nav'
import { poppins } from '@/styles/fonts'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div>

      {/* Header */}
      <section className={` max-w-7xl md:h-226 md:mt-17.5 ml-auto mr-auto ${poppins.className} antialiased`}>

        {/* NAV */}
        <Nav />

        {/* Whole Content Container */}
        <div className='w-full md:h-189 grid grid-cols-1 md:grid-cols-3 gap-8.75 mt-23.5'>

          {/* Man 1 Container*/}
          <div className='md:h-full bg-[#E0E0E0] relative rounded-[10px] overflow-hidden'>
            <Image src={`/assets/Hero/man2.png?v=${Date.now()}`} width={100} height={100} className='md:w-98 absolute bottom-0' alt='Man 2' unoptimized />
          </div>

          {/* Middle Container */}
          <div className='grid grid-cols-1 gap-9'>

            {/* Group Girls Image */}
            <div className='w-full bg-[#E0E0E0] h-37.5 rounded-[10px] relative overflow-hidden flex items-center justify-center'>
              <Image src={`/assets/Hero/girls1.png?v=${Date.now()}`} width={100} height={100} alt='Girls 1' className='w-95.75 absolute bottom-0' unoptimized />
            </div>

            {/* Text Container */}
            <div className='w-full block'>
              <h2 className='text-[91px] text-[#484848] font-medium tracking-[-4%] text-center leading-[100%]'>
                ULTIMATE
              </h2>
              <h1
                style={{ WebkitTextStroke: '1px #484848' }}
                className='text-[187px] text-transparent font-medium tracking-[-5.5%] text-center leading-[100%]'>
                SALE
              </h1>
              <p
                className='text-[20px] text-[#484848] font-normal tracking-[10%] text-center'>
                NEW COLLECTION
              </p>
              <Button text='SHOP NOW' className='px-15 w-max ml-auto mr-auto mt-4.75' />
            </div>

            {/* Group Girls Image */}
            <div className='w-full h-37.5 rounded-[10px] relative overflow-hidden flex items-center justify-center'>
              <Image src={`/assets/Hero/girls2.png?v=${Date.now()}`} width={100} height={100} alt='Girls 2' className='w-95.75 absolute bottom-0' unoptimized />
            </div>

          </div>

          {/* Man 2 Container*/}
          <div className='md:h-full bg-[#E0E0E0] relative rounded-[10px] overflow-hidden flex items-center justify-center'>
            <Image src={`/assets/Hero/man1.png?v=${Date.now()}`} width={100} height={100} className='md:w-62.25 absolute bottom-0' alt='Man 1' unoptimized />
          </div>

        </div>

      </section>
    </div>
  )
}

export default page