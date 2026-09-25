"use client"
import { cn } from '@/lib/utils'
import { volkhov } from '@/styles/fonts'
import Image from 'next/image'
import React from 'react'

const FollowUs = () => {
    return (
        <div>
            {/* Follow Us */}
            <section className={cn('w-full h-max mt-25 ml-auto mr-auto ${poppins.className} antialiased bg-white py-13.75 flex items-center justify-center')}>

                {/* Inner */}
                <div className='md:px-0 px-5'>
                    <div className='grid grid-cols-1 gap-2 md:gap-5 w-full md:w-153.5 ml-auto mr-auto'>
                        <h1 className={`${volkhov.className} md:text-[48px] text-[30px] text-[#484848] text-center`}>Follow us On Instagram</h1>
                        <p className=' text-[14px] md:text-[16px] text-center text-[#8A8A8A]'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin
                        </p>
                    </div>

                    <div className='w-full hidden md:flex items-center justify-between mt-10 md:mt-25 md:overflow-x-clip overflow-x-scroll'>
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

                    <div className='w-full md:hidden flex items-center justify-between mt-10 md:mt-25 md:overflow-x-clip overflow-x-hidden'>
                        <div className='flex items-center animate-marquee md:w-max w-full'>
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

                </div>
            </section>

            <style jsx>{`
                @keyframes marquee {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-50%);
                    }
                }
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                }
            `}</style>
        </div>
    )
}

export default FollowUs
