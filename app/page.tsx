import Button from '@/components/button'
import Nav from '@/components/nav'
import { newArivals } from '@/data/new-arrivals'
import { formatNumber } from '@/lib/functions'
import { cn } from '@/lib/utils'
import { digitalNumbers, poppins, volkhov } from '@/styles/fonts'
import { ChevronLeft, ChevronRight, Minus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className=' w-full'>

      {/* Header */}
      <section className={` max-w-7xl h-max md:mt-17.5 ml-auto mr-auto ${poppins.className} antialiased`}>

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

      {/* Brand icons */}
      <div className='flex items-center justify-center w-full h-50 mt-6.75 shadow-[0_20px_52px_0_rgba(68,68,68,0.04)]'>
        <div className='w-7xl flex items-center justify-between'>
          <Image src={"/assets/Hero/logo-2.png"} width={100} height={100} className='md:w-49' alt='logo2' />
          <Image src={"/assets/Hero/logo-3.png"} width={100} height={100} className='md:w-49' alt='logo3' />
          <Image src={"/assets/Hero/logo-1.png"} width={100} height={100} className='md:w-49' alt='logo1' />
          <Image src={"/assets/Hero/logo-4.png"} width={100} height={100} className='md:w-49' alt='logo4' />
          <Image src={"/assets/Hero/logo.png"} width={100} height={100} className='md:w-49' alt='logo' />
        </div>
      </div>

      {/* Deals Section */}
      <section className={`w-full h-max mt-25 ml-auto mr-auto ${poppins.className} antialiased bg-linear-to-b from-white to-[#FAFAFA] py-13.75 flex items-center justify-center overflow-x-clip`}>

        <div className='w-7xl grid grid-cols-1 md:grid-cols-[auto_auto] gap-9'>

          {/* Copy */}
          <div className='grid grid-cols-1 gap-12.5 w-111'>

            <div className='grid grid-cols-1'>
              <h1 className={`${volkhov.className} text-[46px] font-normal text-[#484848]`}>Deals Of The Month</h1>

              <p className='text-[16px] text-[#8A8A8A] mt-5'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin
              </p>

              <Button text='Buy Now' className='px-17.5 mt-10 text-[16px] flex items-center justify-center' />
            </div>

            {/* Countdown */}
            <div className='grid grid-cols-1 text-[28px] font-medium w-full text-[#484848]'>
              <h3>
                Hurry, Before It’s Too Late!
              </h3>

              {/* Clock Display Container */}
              <div className=' w-max h-max mt-3.75 flex items-center justify-between gap-7.5'>

                {/* Clock Display */}
                <div className='w-19'>
                  <div className={`w-19 h-19 text-center text-[32px] shadow-[0_4px_14px_1px_rgba(0,0,0,0.16)] text-[#484848] rounded-[10px] flex items-center justify-center ${digitalNumbers.className}`}>
                    02
                  </div>
                  <p className='text-[24px] mt-3.75 text-center text-[#484848]'>Days</p>
                </div>

                {/* Clock Display */}
                <div className='w-19'>
                  <div className={`w-19 h-19 text-center text-[32px] shadow-[0_4px_14px_1px_rgba(0,0,0,0.16)] text-[#484848] rounded-[10px] flex items-center justify-center ${digitalNumbers.className}`}>
                    06
                  </div>
                  <p className='text-[24px] mt-3.75 text-center text-[#484848]'>Hr</p>
                </div>

                {/* Clock Display */}
                <div className='w-19'>
                  <div className={`w-19 h-19 text-center text-[32px] shadow-[0_4px_14px_1px_rgba(0,0,0,0.16)] text-[#484848] rounded-[10px] flex items-center justify-center ${digitalNumbers.className}`}>
                    05
                  </div>
                  <p className='text-[24px] mt-3.75 text-center text-[#484848]'>Mins</p>
                </div>

                {/* Clock Display */}
                <div className='w-19'>
                  <div className={`w-19 h-19 text-center text-[32px] shadow-[0_4px_14px_1px_rgba(0,0,0,0.16)] text-[#484848] rounded-[10px] flex items-center justify-center ${digitalNumbers.className}`}>
                    30
                  </div>
                  <p className='text-[24px] mt-3.75 text-center text-[#484848]'>Sec</p>
                </div>

              </div>
            </div>

          </div>

          {/* Carousel */}
          <div className='w-333 relative flex items-center justify-start gap-6'>

            {/* Control Buttons */}
            <div className='bottom-0 w-max flex flex-col items-center justify-end h-full'>
              <div className=' flex items-center justify-between gap-4'>
                {/* Left control Button */}
                <div className='w-12 h-12 shadow-[0_4px_14px_1px_rgba(0,0,0,0.16)] text-[#484848] rounded-full flex items-center justify-center'>
                  <ChevronLeft className=' text-[#B6B6B6]' />
                </div>

                {/* Right control Button */}
                <div className='w-12 h-12 shadow-[0_4px_14px_1px_rgba(0,0,0,0.16)] text-[#484848] rounded-full flex items-center justify-center'>
                  <ChevronRight className=' text-black' />
                </div>
              </div>
            </div>

            {/* carousel Images */}
            <div className=' w-full h-125 grid grid-flow-col auto-cols-87.5 grid-rows-6 gap-6 scrollbar-none relative'>

              {/* Caroucel Images */}
              <div className=' relative row-span-6 bg-red-300 flex items-center justify-center overflow-clip'>
                <Image src={"/assets/deals/woman1.png"} alt='woman 1' className=' w-max' width={400} height={500} />
              </div>
              <div className='row-span-5 bg-sky-300 overflow-clip'>
                <Image src={"/assets/deals/woman2.png"} alt='woman 2' className=' w-full' width={400} height={500} />
              </div>
              <div className='row-span-5 bg-indigo-300 overflow-clip'>
                <Image src={"/assets/deals/woman3.png"} alt='woman 3' className=' w-full' width={400} height={500} />
              </div>
              <div className='row-span-5 bg-indigo-300 overflow-clip'></div>

              {/* Discount Card */}
              <div className='absolute bottom-0 left-0 w-54.25 h-32.5 bg-white ml-6 mb-6 flex items-center justify-center'>

                <div className=''>

                  <div className=' flex items-center justify-between gap-3'>
                    <h5 className=' text-[16px]'>01</h5>

                    <svg width="27" height="1" viewBox="0 0 27 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0.5H27" stroke="#484848" />
                    </svg>

                    <h5 className=' text-[16px]'>
                      Spring Sale
                    </h5>
                  </div>

                  {/* Discount */}
                  <h3 className='text-[28px]'>
                    30% OFF
                  </h3>
                </div>

              </div>

              {/* Indicators */}
              <div className='col-start-2 row-start-6 col-span-1 row-span-1 w-max gap-5 h-7.5 self-end flex items-end justify-between'>
                {
                  [1, 2, 3].map(i => {
                    return (
                      <div key={i} className={`w-6.75 h-6.75 rounded-full ring-black flex items-center justify-center ${i === 1 ? "border" : "border-0"
                        }`}>
                        {/* Inner circle */}
                        <div className={`w-2.75 h-2.75  rounded-full ${i === 1 ? "bg-black" : "bg-[#B6B6B6]"
                          }`} />
                      </div>
                    )
                  })
                }
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* New arrivals */}
      <section className='w-full h-max mt-25 ml-auto mr-auto ${poppins.className} antialiased bg-white py-13.75 flex items-center justify-center'>

        {/* Inner */}
        <div>
          <div className='grid grid-cols-1 gap-5 w-153.5 ml-auto mr-auto'>
            <h1 className={`${volkhov.className} text-[48px] text-[#484848] text-center`}>New Arrivals</h1>
            <p className=' text-[16px] text-center text-[#8A8A8A]'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin
            </p>
          </div>

          <div className='mt-12.5 grid grid-flow-col auto-cols-max ml-auto mr-auto gap-7.5'>

            {/* Tabs */}

            {
              [
                "Men's Fashion",
                "Women's Fashion",
                "Women Acessories",
                "Men Accessories",
                "Discount Deals"
              ].map(tab => (
                <Button key={tab} text={tab} className={cn("shadow-none",
                  tab === "Women's Fashion" ? "bg-black text-white" : "bg-[#FAFAFA] text-[#8A8A8A]")} />
              ))
            }

          </div>

          {/* Grid */}
          <div className='grid grid-cols-3 gap-15 w-full ml-auto mr-auto mt-12.5'>

            {
              newArivals.map(product => (
                <div key={product.id} className='w-96.5 h-max bg-white shadow-[0_40px_90px_0_rgba(0,0,0,0.06)] rounded-[10px] px-6.25 pt-3.75 pb-8.75'>
                  <Image src={product.image} alt='' width={400} height={400} />

                  <div className='w-full h-max flex items-center justify-between mt-3'>

                    {/* Product Name */}
                    <div>
                      <h3 className='text-[20px] font-medium text-[#484848]'>{product.name}</h3>
                      <p className='text-[12px] text-[#8A8A8A]'>{product.seller}</p>
                    </div>

                    {/* Stars */}
                    <div className='flex items-center justify-between'>
                      {
                        Array.from({ length: product.rating }).map((_, index) => (
                          <span key={index}>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6646 7.12771L9.5 0L7.33536 7.12771H0L5.93479 11.742L3.73214 19L9.5 14.5146L15.2679 19L13.0652 11.742L19 7.12771H11.6646Z" fill="#FCA120" />
                            </svg>
                          </span>
                        ))
                      }
                    </div>
                  </div>

                  {/* Reviews */}
                  <p className='text-[12px] font-medium text-[#484848] mt-6.25'>
                    ({
                      formatNumber(product.reviews)
                    }) Customer Reviews
                  </p>

                  {/* Price */}
                  <div className='w-full h-max flex items-center justify-between mt-6.25'>

                    <h2 className='text-[24px] font-medium leading-5 tracking-[-1%] text-[#484848] mt-6.25'>
                      ${product.price}
                    </h2>

                    <h4 className='leading-5 tracking-[-1%] text-[12px] text-[#FF4646]'>{product.saleStatus}</h4>

                  </div>
                </div>
              ))
            }

          </div>
        </div>

      </section>
    </div>
  )
}

export default page