import Banner from '@/components/banner'
import Button from '@/components/button'
import DealsCarousel from '@/components/carousel'
import Countdown from '@/components/countdown-timer'
import FollowUs from '@/components/follow-us'
import NewsLetter from '@/components/newsletter'
import { newArivals } from '@/data/new-arrivals'
import { customerReviews } from '@/data/reviews'
import { formatNumber } from '@/lib/functions'
import { cn } from '@/lib/utils'
import { digitalNumbers, poppins, volkhov } from '@/styles/fonts'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className=' w-full'>

      {/* Header */}
      <section className={` w-full max-w-7xl h-max md:mt-17.5 ml-auto mr-auto ${poppins.className} antialiased`}>

        {/* Whole Content Container */}
        <div className='w-full md:h-189 grid grid-cols-1 md:grid-cols-3 gap-8.75 md:mt-23.5 mt-0 md:p-0 p-5'>

          {/* Man 1 Container*/}
          <div className='md:h-full bg-[#E0E0E0] relative rounded-[10px] overflow-hidden hidden md:block'>
            <Image src={"/assets/Hero/man2.png"} width={100} height={100} className='md:w-98 w-50 md:absolute md:bottom-0' alt='Man 2' unoptimized />
          </div>

          {/* Middle Container */}
          <div className='grid grid-cols-1 gap-9'>

            {/* Group Girls Image */}
            <div className='w-full bg-[#E0E0E0] md:h-37.5 h-max rounded-[10px] relative overflow-hidden flex items-center justify-center'>
              <Image src={"/assets/Hero/girls1.png"} width={100} height={100} alt='Girls 1' className='w-95.75 h-max md:absolute bottom-0' unoptimized />
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
              <Link href={"/fashion"}>
                <Button text='SHOP NOW' className='px-15 w-max ml-auto mr-auto mt-4.75 md:text-[16px] text-[14px]' />
              </Link>
            </div>

            {/* Group Girls Image */}
            <div className='w-full h-37.5 rounded-[10px] relative overflow-hidden flex items-center justify-center'>
              <Image src={"/assets/Hero/girls2.png"} width={100} height={100} alt='Girls 2' className='w-95.75 md:absolute bottom-0' unoptimized />
            </div>

          </div>

          {/* Man 2 Container*/}
          <div className='md:h-full bg-[#E0E0E0] relative rounded-[10px] overflow-hidden md:flex hidden items-center justify-center'>
            <Image src={"/assets/Hero/man1.png"} width={100} height={100} className='md:w-62.25 absolute bottom-0' alt='Man 1' unoptimized />
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

                <Countdown />

              </div>
            </div>
          </div>

          {/* Carousel */}
          <DealsCarousel />
        </div>

      </section>

      {/* New arrivals */}
      <section className={cn(`w-full h-max md:mt-25 mt-10 ml-auto mr-auto ${poppins.className} antialiased bg-white py-13.75 flex items-center justify-center`)}>

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

      <Banner />

      <FollowUs />

      {/* Reviews */}
      <section className={cn(`w-full h-max mt-10 md:mt-25 ml-auto mr-auto ${poppins.className} antialiased bg-[#FAFAFA] py-13.75 flex items-center justify-center`)}>

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

      <NewsLetter />

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
