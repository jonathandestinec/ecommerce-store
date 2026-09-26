import Banner from '@/components/banner'
import Button from '@/components/button'
import DealsCarousel from '@/components/carousel'
import Countdown from '@/components/countdown-timer'
import FollowUs from '@/components/follow-us'
import NewsLetter from '@/components/newsletter'
import NewArrivals from '@/components/new-arrivals'
import ReviewsCarousel from '@/components/reviews-carousel'
import { poppins, volkhov } from '@/styles/fonts'
import Image from 'next/image'
import Link from 'next/link'

const page = () => {
  return (
    <div className=' w-full'>

      {/* Header */}
      <section className={`w-full max-w-7xl h-max md:mt-10 ml-auto mr-auto ${poppins.className} antialiased`}>

        {/* Whole Content Container */}
        <div className='w-full md:h-[540px] grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 md:mt-10 mt-0 p-5 md:p-0'>

          {/* Man 1 Container*/}
          <div className='col-start-1 row-start-1 h-40 md:col-auto md:row-auto md:h-full bg-[#E0E0E0] relative rounded-lg md:rounded-[10px] overflow-hidden md:block'>
            <Image src='/assets/Hero/man2.png' fill sizes='(max-width: 768px) 45vw, 400px' className='object-contain object-bottom' alt='Model wearing the latest menswear' />
          </div>

          {/* Middle Container */}
          <div className='col-span-2 col-start-1 row-start-2 md:col-span-1 md:col-start-auto md:row-start-auto grid grid-cols-1 gap-3 md:gap-5'>

            {/* Group Girls Image */}
            <div className='w-full bg-[#E0E0E0] h-20 md:h-27 relative overflow-hidden rounded-lg flex items-center justify-center'>
              <Image src='/assets/Hero/girls1.png' fill sizes='(max-width: 768px) 90vw, 600px' alt='Models from the new collection' className='object-cover object-center' />
            </div>

            {/* Text Container */}
            <div className='w-full block'>
              <h2 className='md:text-[76px] text-[clamp(40px,12vw,72px)] text-[#484848] font-medium tracking-[-.04em] text-center leading-[100%]'>
                ULTIMATE
              </h2>
              <h1
                style={{ WebkitTextStroke: '1px #484848' }}
                className='md:text-[154px] text-[clamp(84px,24vw,145px)] text-transparent font-medium tracking-[-.055em] text-center leading-[.9]'>
                SALE
              </h1>
              <p
                className='text-[12px] md:text-[16px] text-[#484848] font-normal tracking-[.18em] text-center'>
                NEW COLLECTION
              </p>
              <Link href={'/fashion'} className="flex justify-center">
                <Button text='SHOP NOW' className='px-12 md:px-15 w-max mt-4 md:text-[16px] text-[12px]' />
              </Link>
            </div>

            {/* Group Girls Image */}
            <div className='w-full h-20 md:h-27 rounded-lg relative overflow-hidden flex items-center justify-center'>
              <Image src='/assets/Hero/girls2.png' fill sizes='(max-width: 768px) 90vw, 600px' alt='Models in vibrant new-season looks' className='object-cover object-center' />
            </div>

          </div>

          {/* Man 2 Container*/}
          <div className='col-start-2 row-start-1 h-40 md:col-auto md:row-auto md:h-full bg-[#E0E0E0] relative rounded-lg md:rounded-[10px] overflow-hidden flex items-center justify-center'>
            <Image src='/assets/Hero/man1.png' fill sizes='(max-width: 768px) 45vw, 300px' className='object-contain object-bottom' alt='Model wearing a refined casual look' />
          </div>

        </div>

        {/* Brand icons */}
        <div className='flex items-center justify-center w-full md:h-28 h-max md:mt-3 mt-0 py-5 shadow-[0_20px_52px_0_rgba(68,68,68,0.04)] px-5'>
          <div className='w-full md:w-7xl flex items-center justify-between gap-2 md:gap-0'>
            <Image src={'/assets/Hero/logo-2.png'} width={196} height={56} className='w-[18%] max-w-40' alt='Chanel' />
            <Image src={'/assets/Hero/logo-3.png'} width={196} height={56} className='w-[18%] max-w-40' alt='Louis Vuitton' />
            <Image src={'/assets/Hero/logo-1.png'} width={196} height={56} className='w-[18%] max-w-40' alt='Prada' />
            <Image src={'/assets/Hero/logo-4.png'} width={196} height={56} className='w-[18%] max-w-40' alt='Calvin Klein' />
            <Image src={'/assets/Hero/logo.png'} width={196} height={56} className='w-[18%] max-w-40' alt='Denim' />
          </div>
        </div>
      </section>

      {/* Deals Section */}
      <section id="deals" className={`w-full h-max md:mt-16 mt-10 ml-auto mr-auto ${poppins.className} antialiased bg-linear-to-b from-white to-[#FAFAFA] py-12 md:py-16 flex items-center justify-center overflow-x-clip`}>

        <div className='w-full max-w-7xl grid grid-cols-1 md:grid-cols-[minmax(420px,.5fr)_minmax(0,1fr)] gap-8 md:gap-10 md:px-0 px-5'>

          {/* Copy */}
          <div className='grid grid-cols-1 md:gap-10 w-full'>

            <div className='grid grid-cols-1'>
              <h1 className={`${volkhov.className} md:text-[42px] text-[30px] font-normal text-[#484848] text-center md:text-left`}>Deals Of The Month</h1>

              <p className='md:text-[14px] text-[13px] leading-6 text-[#8A8A8A] md:mt-4 mt-3 text-center md:text-left'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin
              </p>

              <Link href="/fashion" className="mt-5 flex justify-center md:mt-8 md:justify-start"><Button text='Buy Now' className='md:px-14 px-11 text-[14px]' /></Link>
            </div>

            {/* Countdown */}
            <div className='grid grid-cols-1 text-xl font-medium w-full text-[#484848] md:mt-0 mt-8 text-center md:text-left md:text-2xl'>
              <h3 className="text-base md:text-xl">
                Hurry, Before It’s Too Late!
              </h3>

              {/* Clock Display Container */}
              <div className='w-full h-max md:mt-3.75 mt-2 flex items-center justify-center md:justify-start gap-2 md:gap-5'>

                <Countdown />

              </div>
            </div>
          </div>

          {/* Carousel */}
          <DealsCarousel />
        </div>

      </section>

      <NewArrivals />

      <Banner />

      <FollowUs />

      <ReviewsCarousel />

      <NewsLetter />

      <footer className='mt-10 min-h-36 border-t-[#DEDFE1] border-t w-full px-5 py-6 md:px-0'>

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
