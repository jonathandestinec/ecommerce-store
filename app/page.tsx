import Button from '@/components/button'
import Nav from '@/components/nav'
import { newArivals } from '@/data/new-arrivals'
import { customerReviews } from '@/data/reviews'
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
      <section className={` w-full max-w-7xl h-max md:mt-17.5 ml-auto mr-auto ${poppins.className} antialiased`}>

        {/* NAV */}
        <Nav />

        {/* Whole Content Container */}
        <div className='w-full md:h-189 grid grid-cols-1 md:grid-cols-3 gap-8.75 md:mt-23.5 mt-0 md:p-0 p-5'>

          {/* Man 1 Container*/}
          <div className='md:h-full bg-[#E0E0E0] relative rounded-[10px] overflow-hidden hidden md:block'>
            <Image src={`/assets/Hero/man2.png?v=${Date.now()}`} width={100} height={100} className='md:w-98 w-50 md:absolute md:bottom-0' alt='Man 2' unoptimized />
          </div>

          {/* Middle Container */}
          <div className='grid grid-cols-1 gap-9'>

            {/* Group Girls Image */}
            <div className='w-full bg-[#E0E0E0] md:h-37.5 h-max rounded-[10px] relative overflow-hidden flex items-center justify-center'>
              <Image src={`/assets/Hero/girls1.png?v=${Date.now()}`} width={100} height={100} alt='Girls 1' className='w-95.75 h-max md:absolute bottom-0' unoptimized />
            </div>

            {/* Text Container */}
            <div className='w-full block'>
              <h2 className='md:text-[91px] text-[45px] text-[#484848] font-medium tracking-[-4%] text-center leading-[100%]'>
                ULTIMATE
              </h2>
              <h1
                style={{ WebkitTextStroke: '1px #484848' }}
                className='md:text-[187px] text-[100px] text-transparent font-medium tracking-[-5.5%] text-center leading-[100%]'>
                SALE
              </h1>
              <p
                className='text-[20px] text-[#484848] font-normal tracking-[10%] text-center'>
                NEW COLLECTION
              </p>
              <Button text='SHOP NOW' className='px-15 w-max ml-auto mr-auto mt-4.75 md:text-[16px] text-[14px]' />
            </div>

            {/* Group Girls Image */}
            <div className='w-full h-37.5 rounded-[10px] relative overflow-hidden flex items-center justify-center'>
              <Image src={`/assets/Hero/girls2.png?v=${Date.now()}`} width={100} height={100} alt='Girls 2' className='w-95.75 md:absolute bottom-0' unoptimized />
            </div>

          </div>

          {/* Man 2 Container*/}
          <div className='md:h-full bg-[#E0E0E0] relative rounded-[10px] overflow-hidden md:flex hidden items-center justify-center'>
            <Image src={`/assets/Hero/man1.png?v=${Date.now()}`} width={100} height={100} className='md:w-62.25 absolute bottom-0' alt='Man 1' unoptimized />
          </div>

        </div>

        {/* Brand icons */}
        <div className='flex items-center justify-center w-full md:h-50 h-max md:mt-6.75 mt-4 shadow-[0_20px_52px_0_rgba(68,68,68,0.04)] px-5'>
          <div className='w-full md:w-7xl flex items-center md:justify-between justify-evenly flex-wrap md:gap-0 gap-5'>
            <Image src={"/assets/Hero/logo-2.png"} width={100} height={100} className='md:w-49 w-20' alt='logo2' />
            <Image src={"/assets/Hero/logo-3.png"} width={100} height={100} className='md:w-49 w-20' alt='logo3' />
            <Image src={"/assets/Hero/logo-1.png"} width={100} height={100} className='md:w-49 w-20' alt='logo1' />
            <Image src={"/assets/Hero/logo-4.png"} width={100} height={100} className='md:w-49 w-20' alt='logo4' />
            <Image src={"/assets/Hero/logo.png"} width={100} height={100} className='md:w-49 w-20' alt='logo' />
          </div>
        </div>
      </section>

      {/* Deals Section */}
      <section className={`w-full h-max md:mt-25 mt-10 ml-auto mr-auto ${poppins.className} antialiased bg-linear-to-b from-white to-[#FAFAFA] py-13.75 flex items-center justify-center overflow-x-clip`}>

        <div className='w-full md:w-7xl grid grid-cols-1 md:grid-cols-[auto_auto] gap-9 md:px-0 px-5'>

          {/* Copy */}
          <div className='grid grid-cols-1 md:gap-12.5 md:w-111 w-full'>

            <div className='grid grid-cols-1'>
              <h1 className={`${volkhov.className} md:text-[46px] text-[30px] font-normal text-[#484848]`}>Deals Of The Month</h1>

              <p className='md:text-[16px] text-[14px] text-[#8A8A8A] md:mt-5 mt-3'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin
              </p>

              <Button text='Buy Now' className='md:px-17.5 px-11 md:mt-10 mt-5 text-[16px] flex items-center justify-center' />
            </div>

            {/* Countdown */}
            <div className='grid grid-cols-1 text-[28px] font-medium w-full text-[#484848] md:mt-0 mt-10'>
              <h3>
                Hurry, Before It’s Too Late!
              </h3>

              {/* Clock Display Container */}
              <div className=' w-max h-max md:mt-3.75 mt-2 flex items-center justify-between md:gap-7.5 md:ml-0 md:mr-0 ml-auto mr-auto -space-x-4'>

                {/* Clock Display */}
                <div className='md:scale-100 scale-[65%]'>
                  <div className={`w-19 h-19 text-center text-[32px] shadow-[0_4px_14px_1px_rgba(0,0,0,0.16)] text-[#484848] rounded-[10px] flex items-center justify-center ${digitalNumbers.className}`}>
                    02
                  </div>
                  <p className='text-[24px] mt-3.75 text-center text-[#484848]'>Days</p>
                </div>

                {/* Clock Display */}
                <div className='md:scale-100 scale-[65%]'>
                  <div className={`w-19 h-19 text-center text-[32px] shadow-[0_4px_14px_1px_rgba(0,0,0,0.16)] text-[#484848] rounded-[10px] flex items-center justify-center ${digitalNumbers.className}`}>
                    06
                  </div>
                  <p className='text-[24px] mt-3.75 text-center text-[#484848]'>Hr</p>
                </div>

                {/* Clock Display */}
                <div className='md:scale-100 scale-[65%]'>
                  <div className={`w-19 h-19 text-center text-[32px] shadow-[0_4px_14px_1px_rgba(0,0,0,0.16)] text-[#484848] rounded-[10px] flex items-center justify-center ${digitalNumbers.className}`}>
                    05
                  </div>
                  <p className='text-[24px] mt-3.75 text-center text-[#484848]'>Mins</p>
                </div>

                {/* Clock Display */}
                <div className='md:scale-100 scale-[65%]'>
                  <div className={`w-19 h-19 text-center text-[32px] shadow-[0_4px_14px_1px_rgba(0,0,0,0.16)] text-[#484848] rounded-[10px] flex items-center justify-center ${digitalNumbers.className}`}>
                    30
                  </div>
                  <p className='text-[24px] mt-3.75 text-center text-[#484848]'>Sec</p>
                </div>

              </div>
            </div>
          </div>

          {/* Carousel */}
          <div className='w-full md:w-333 relative md:flex items-center justify-start block gap-6 md:ml-0 md:mr-0 ml-auto mr-auto'>

            {/* Control Buttons */}
            <div className='bottom-0 w-max flex flex-col items-center justify-end md:h-full h-max md:mb-0 mb-3'>
              <div className=' flex items-center justify-between md:gap-4 gap-2'>
                {/* Left control Button */}
                <div className='md:size-12 size-10 shadow-[0_4px_14px_1px_rgba(0,0,0,0.16)] text-[#484848] rounded-full flex items-center justify-center'>
                  <ChevronLeft className=' text-[#B6B6B6]' />
                </div>

                {/* Right control Button */}
                <div className='md:size-12 size-10 shadow-[0_4px_14px_1px_rgba(0,0,0,0.16)] text-[#484848] rounded-full flex items-center justify-center'>
                  <ChevronRight className=' text-black' />
                </div>
              </div>
            </div>

            {/* carousel Images */}
            <div className=' w-full md:h-125 h-70 grid grid-flow-col md:auto-cols-87.5 auto-cols-max min-w-0 grid-rows-6 md:gap-6 gap-3 scrollbar-none relative overflow-x-scroll'>

              {/* Caroucel Images */}
              <div className=' relative row-span-6 flex items-center justify-center overflow-clip md:w-full w-max'>
                <Image src={"/assets/deals/woman1.png"} alt='woman 1' className=' md:w-max w-auto h-full' width={400} height={500} />
              </div>

              <div className='row-span-5 overflow-clip'>
                <Image src={"/assets/deals/woman2.png"} alt='woman 2' className=' md:w-max w-auto h-full' width={400} height={500} />
              </div>

              <div className='row-span-5 overflow-clip'>
                <Image src={"/assets/deals/woman3.png"} alt='woman 3' className=' md:w-max w-auto h-full' width={400} height={500} />
              </div>

              <div className='row-span-5 overflow-clip'></div>

              {/* Discount Card */}
              <div className='absolute bottom-0 left-0 md:w-54.25 w-34 md:h-32.5 h-20 bg-white ml-6 mb-6 flex items-center justify-center md:p-0 p-5'>

                <div className=''>

                  <div className=' md:flex md:flex-row flex-col items-center justify-between gap-3'>
                    <h5 className=' md:text-[16px] text-[12px]'>01</h5>

                    <svg width="27" height="1" viewBox="0 0 27 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0.5H27" stroke="#484848" />
                    </svg>

                    <h5 className=' md:text-[16px] text-[12px]'>
                      Spring Sale
                    </h5>
                  </div>

                  {/* Discount */}
                  <h3 className='md:text-[28px] text-[18px]'>
                    30% OFF
                  </h3>
                </div>

              </div>

              {/* Indicators */}
              <div className='col-start-2 row-start-6 col-span-1 row-span-1 w-max md:gap-5 gap-2 h-7.5 self-end flex items-end justify-between absolute z-10'>
                {
                  [1, 2, 3].map(i => {
                    return (
                      <div key={i} className={`md:w-6.75 md:h-6.75 size-3 rounded-full ring-black flex items-center justify-center ${i === 1 ? "border" : "border-0"
                        }`}>
                        {/* Inner circle */}
                        <div className={`md:w-2.75 md:h-2.75 size-1.5  rounded-full ${i === 1 ? "bg-black" : "bg-[#B6B6B6]"
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
      <section className='w-full h-max md:mt-25 mt-10 ml-auto mr-auto ${poppins.className} antialiased bg-white py-13.75 flex items-center justify-center'>

        {/* Inner */}
        <div className='px-5'>
          <div className='grid grid-cols-1 md:gap-5 gap-2 md:w-153.5 w-full ml-auto mr-auto'>
            <h1 className={`${volkhov.className} md:text-[48px] text-[30px] text-[#484848] text-center`}>New Arrivals</h1>
            <p className=' md:text-[16px] text-[14px] text-center text-[#8A8A8A]'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin
            </p>
          </div>

          <div className='mt-12.5 w-full md:grid md:grid-flow-col md:auto-cols-max flex flex-wrap ml-auto mr-auto md:gap-7.5 gap-3 items-center justify-center'>

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
          <div className='grid md:grid-cols-3 grid-cols-1 gap-15 w-full ml-auto mr-auto mt-12.5'>

            {
              newArivals.map(product => (
                <div key={product.id} className='md:w-96.5 h-max w-60 bg-white shadow-[0_40px_90px_0_rgba(0,0,0,0.06)] rounded-[10px] md:px-6.25 px-3 pt-3.75 pb-5 md:pb-8.75 md:ml-0 md:mr-0 ml-auto mr-auto'>
                  <Image src={product.image} alt='' width={400} height={400} />

                  <div className='w-full h-max flex items-center justify-between mt-3'>

                    {/* Product Name */}
                    <div>
                      <h3 className='text-[14px] md:text-[20px] font-medium text-[#484848]'>{product.name}</h3>
                      <p className='text-[12px] text-[#8A8A8A]'>{product.seller}</p>
                    </div>

                    {/* Stars */}
                    <div className='flex items-center justify-between'>
                      {
                        Array.from({ length: product.rating }).map((_, index) => (
                          <span key={index}>
                            <svg className='size-2 md:size-4.75' width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M11.6646 7.12771L9.5 0L7.33536 7.12771H0L5.93479 11.742L3.73214 19L9.5 14.5146L15.2679 19L13.0652 11.742L19 7.12771H11.6646Z" fill="#FCA120" />
                            </svg>
                          </span>
                        ))
                      }
                    </div>
                  </div>

                  {/* Reviews */}
                  <p className='md:text-[12px] text-[10px] font-medium text-[#484848] mt-4 md:mt-6.25'>
                    ({
                      formatNumber(product.reviews)
                    }) Customer Reviews
                  </p>

                  {/* Price */}
                  <div className='w-full h-max flex items-center justify-between md:mt-6.25 mt-3'>

                    <h2 className='md:text-[24px] text-[16px] font-medium tracking-[-1%] leading-0 text-[#484848]'>
                      ${product.price}
                    </h2>

                    <h4 className='tracking-[-1%] md:text-[12px] text-[10px] text-[#FF4646]'>{product.saleStatus}</h4>

                  </div>
                </div>
              ))
            }

          </div>

          <Button text='View More' className='mt-12.5 ml-auto mr-auto md:px-15.5 px-8' />
        </div>
      </section>

      {/* Banner Section */}
      <section className='w-full h-max md:mt-25 mt-10 ml-auto mr-auto ${poppins.className} antialiased bg-white py-13.75 flex items-center justify-center'>

        {/* Inner */}
        <div className='w-full'>
          <div className='grid md:grid-cols-2 grid-cols-1 gap-7.5 w-full ml-auto mr-auto bg-[#DADADA]'>
            <Image src={"/assets/banner/banner.png"} width={700} height={700} alt='Banner' className='w-full h-full' />

            {/* Copy */}
            <div className='md:py-15 md:pt-15 pt-6 py-10 md:px-0 px-5'>
              <h5 className='text-[#767676] text-[14px] md:text-[16px]'>Women Collection</h5>
              <h4 className={cn('text-[#484848] text-[30px] md:text-[48px] md:mt-5 mt-2', volkhov.className)}>
                Peaky Blinders
              </h4>
              <h5 className='text-[#000000] text-[14px] md:text-[16px] md:mt-5 mt-2'>DESCRIPTION</h5>
              <p className='text-[#767676] text-[14px] md:text-[16px] md:mt-5 mt-2 md:w-128.75 w-full'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis.
              </p>

              <div className='flex items-center justify-between gap-3.75 w-max'>
                <h5 className='text-[#767676] text-[14px] md:text-[16px] mt-5'>Size:</h5>
                <h5 className='text-[#ffffff] text-[14px] md:text-[16px] mt-5 bg-black rounded-[10px] md:py-1.5 py-0.5 px-5'>M</h5>
              </div>

              <p className='text-[#000000] md:mt-5 mt-2 md:w-128.75 md:text-[28px] text-[18px] font-medium'>$100.<span className='text-[16px] md:text-[24px]'>00</span></p>

              <Button text='Buy Now' className='md:mt-5 mt-2 md:px-15.5 px-8' />
            </div>
          </div>

          <div className='w-full h-max shadow-[0_20px_52.29px_0_rgba(68,68,68,0.04)] md:py-18 py-10'>
            {/* Delivery Icons */}
            <div className=' flex flex-wrap items-center md:justify-between justify-evenly md:gap-25 gap-5 md:w-max w-full ml-auto mr-auto'>
              {
                [
                  "/assets/banner/icon.png",
                  "/assets/banner/icon2.png",
                  "/assets/banner/icon3.png",
                  "/assets/banner/icon4.png",
                ].map((image, index) => (
                  <Image key={index} width={400} height={400} alt='' src={image} className='md:w-50 w-30' />
                ))
              }
            </div>
          </div>
        </div>

      </section>

      {/* Follow Us */}
      <section className='w-full h-max mt-25 ml-auto mr-auto ${poppins.className} antialiased bg-white py-13.75 flex items-center justify-center'>

        {/* Inner */}
        <div className='md:px-0 px-5'>
          <div className='grid grid-cols-1 gap-2 md:gap-5 w-full md:w-153.5 ml-auto mr-auto'>
            <h1 className={`${volkhov.className} md:text-[48px] text-[30px] text-[#484848] text-center`}>Follow us On Instagram</h1>
            <p className=' text-[14px] md:text-[16px] text-center text-[#8A8A8A]'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin
            </p>
          </div>

          <div className='w-full flex items-center justify-between mt-10 md:mt-25 md:overflow-x-clip overflow-x-scroll'>
            {/* Images */}
            {
              [
                "/assets/followus/1.png",
                "/assets/followus/2.png",
                "/assets/followus/3.png",
                "/assets/followus/4.png",
                "/assets/followus/5.png",
                "/assets/followus/6.png",
                "/assets/followus/7.png",
              ].map((image, index) => (
                <Image key={index} src={image} width={400} height={400} alt='social image' className='' />
              ))
            }
          </div>

        </div>
      </section>

      {/* Reviews */}
      <section className='w-full h-max mt-10 md:mt-25 ml-auto mr-auto ${poppins.className} antialiased bg-[#FAFAFA] py-13.75 flex items-center justify-center'>

        {/* Inner */}
        <div className='md:px-0 px-5'>
          <div className='grid grid-cols-1 gap-2 md:gap-5 md:w-max w-full ml-auto mr-auto'>
            <h1 className={`${volkhov.className} text-[30px] md:text-[48px] text-[#484848] text-center`}>This Is What Our Customers Say</h1>
            <p className=' text-[14px] md:text-[16px] text-center text-[#8A8A8A]'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis
            </p>
          </div>

          {/* Reviews */}
          <div className='w-full max-w-7xl relative mt-10 md:mt-25 block md:flex items-center justify-between'>

            {/* Reviews Cards */}
            {
              customerReviews.map((review, index) => (
                <div key={index} className={cn("flex-col md:flex-row md:flex items-center justify-between px-5 py-5 mb-5 md:px-9 gap-16.5 bg-white shadow-[0_14.95px_44.86px_0_rgba(46,33,61,0.08)] rounded-[7.48px]",
                  review.id !== 2 ? "md:w-175 w-full md:h-75 h-max" : " md:absolute relative w-full md:w-216 md:h-90 h-max md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
                )}>

                  <Image src={review.customerProfilePhoto} width={400} height={400} alt={review.customerName} className={cn(
                    review.id !== 2 ? "size-24 md:size-[196.64px]" : "md:size-65.75 size-24"
                  )} />

                  <div>
                    <p className={cn("text-[#484848] md:mt-0 mt-2",
                      review.id !== 2 ? "text-[11.96px]" : "md:text-[16px] text-[14px]"
                    )}>{review.customerQuote}</p>

                    {/* Stars */}
                    <div className='flex items-center justify-between mt-2 md:mt-5 w-max md:w-17.5'>
                      {
                        Array.from({ length: review.customerRating }).map((_, index) => (
                          <span key={index}>
                            <svg className='md:w-4.75 w-2.5' width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M11.6646 7.12771L9.5 0L7.33536 7.12771H0L5.93479 11.742L3.73214 19L9.5 14.5146L15.2679 19L13.0652 11.742L19 7.12771H11.6646Z" fill="#FCA120" />
                            </svg>
                          </span>
                        ))
                      }
                    </div>

                    {/* Divider */}
                    <div className='mt-2 md:mt-5.5'>
                      <svg width="172" height="1" viewBox="0 0 172 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="9.53674e-07" width="171.968" height="0.747685" fill="#484848" />
                      </svg>
                    </div>

                    {/* Customer Name */}
                    <h3 className={cn(volkhov.className, "text-[#484848] mt-2 md:mt-3",
                      review.id !== 2 ? "text-[14px] md:text-[23.93px]" : "text-[32px]"
                    )}>{review.customerName}</h3>

                    <p className={cn('text-[#484848] mt-2',
                      review.id !== 2 ? "text-[10px] md:text-[12px]" : "text-[16px]"
                    )}>{review.customerOccupation}</p>
                  </div>

                </div>
              ))
            }
          </div>

          {/* Buttons */}
          <div className='bottom-0 w-max hidden md:flex flex-col items-center justify-end h-full mt-10 md:mt-20 ml-auto mr-auto'>
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
        </div>
      </section>

      {/* Newsletter */}
      <section className='w-full h-max mt-10 md:mt-25 ml-auto mr-auto ${poppins.className} antialiased bg-white py-13.75 flex items-center justify-center'>

        {/* Inner */}
        <div className='md:px-0 px-5'>
          <div className='flex-col md:flex-row md:flex items-center justify-between ml-auto mr-auto w-full md:w-max'>

            <Image src={"/assets/newsletter/man.png"} width={600} height={600} alt='Man' className='md:block hidden w-88.75' />

            {/* Copy */}
            <div className='w-full h-max md:h-70 flex items-center justify-center'>
              <div className='grid grid-cols-1 gap-2 md:gap-7.5 w-full md:w-170 ml-auto mr-auto'>
                <h1 className={`${volkhov.className} text-[30px] md:text-[46px] text-[#484848] text-center`}>Subscribe To Our Newsletter</h1>
                <p className=' text-[14px] md:text-[16px] text-center text-[#8A8A8A]'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin
                </p>

                {/* Input */}
                <input type="email" name="newsletter" id="newsletter" className='w-[80%] md:w-157.75 shadow-[0_3.02px_3.15px_rgba(0,0,0,0.0096),0_13.28px_6.52px_rgba(0,0,0,0.0157),0_32.6px_13px_rgba(0,0,0,0.02),0_62.79px_25.48px_rgba(0,0,0,0.0243),0_105.65px_46.85px_rgba(0,0,0,0.0304),0_163px_80px_rgba(0,0,0,0.04)] ml-auto mr-auto text-[14px] md:text-[22px] text-[#8A8A8A] p-5 py-2.5 md:py-7.5 md:p-7.5 leading-6.25 flex items-center md:mt-0 mt-5' placeholder='michael@ymail.com' />

                {/* Button */}
                <Button text='Subscribe Now' className='ml-auto mr-auto md:mt-0 mt-5' />
              </div>
            </div>

            <Image src={"/assets/newsletter/woman.png"} width={600} height={600} alt='Woman' className='w-36 md:w-88.75 place-self-center justify-self-center md:mt-0 mt-10' />

          </div>
        </div>

      </section>

      <footer className='mt-12.5 h-34.5 border-t-[#DEDFE1] border-t w-full md:px-0 px-5'>

        <div className='flex-col md:flex-row md:flex items-center justify-between  w-full md:w-7xl ml-auto mr-auto'>
          {/* Logo */}
          <h1 className={`text-[32px] text-[#484848] ${volkhov.className}`}>
            FASCO
          </h1>

          {/* Links */}
          <ul className='flex flex-wrap items-center md:justify-between justify-evenly gap-5 md:gap-14.5 md:mt-0 mt-5'>
            {
              [
                { text: "Support Center", url: "/support" },
                { text: "Invoicing", url: "invoicing" },
                { text: "Contract", url: "/contract" },
                { text: "Careers", url: "/careers" },
                { text: "Blog", url: "/blog" },
                { text: "FAQ,s", url: "/faq" },
              ].map((link, index) => (
                <li key={index} className=' text-[14px] md:text-[16px]'>
                  {
                    <a href={link.url}>{link.text}</a>
                  }
                </li>
              ))
            }
          </ul>
        </div>

        <h5 className='text-[12px] text-[#484848] mt-12.5 text-center'>Copyright © 2022 Xpro . All Rights Reseved.</h5>

      </footer>

    </div>
  )
}

export default page