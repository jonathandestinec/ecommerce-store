import Image from 'next/image'
import React from 'react'
import Button from './button'
import { volkhov } from '@/styles/fonts'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const Banner = () => {
    return (
        <div>
            {/* Banner Section */}
            <section id="banner" className={cn('w-full h-max md:mt-16 mt-10 ml-auto mr-auto antialiased bg-white py-8 md:py-0 flex items-center justify-center')}>

                {/* Inner */}
                <div className='w-full'>
                    <div className='grid md:grid-cols-[1fr_1fr] grid-cols-1 gap-0 w-full ml-auto mr-auto bg-[#DADADA]'>
                        <div className="relative min-h-[300px] md:min-h-[420px]">
                            <Image src={"/assets/banner/banner.png"} fill sizes="(max-width: 768px) 100vw, 50vw" alt='Model presenting the featured collection' className='object-cover object-center' />
                        </div>

                        {/* Copy */}
                        <div className='md:py-12 md:pt-12 pt-6 py-10 md:px-10 lg:px-16 px-5'>
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

                            <Link href="/fashion" className="mt-3 flex md:mt-5"><Button text='Buy Now' className='md:px-15.5 px-8' /></Link>
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
        </div>
    )
}

export default Banner
