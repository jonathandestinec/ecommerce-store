"use client"
import { cn } from '@/lib/utils'
import { volkhov } from '@/styles/fonts'
import Image from 'next/image'
import React from 'react'

const FollowUs = () => {
    return (
        <div>
            {/* Follow Us */}
            <section className={cn('w-full min-w-0 overflow-x-clip h-max mt-16 ml-auto mr-auto antialiased bg-white py-10 md:py-14 flex items-center justify-center')}>

                {/* Inner */}
                <div className='w-full min-w-0 overflow-x-clip md:px-0 px-5'>
                    <div className='grid grid-cols-1 gap-2 md:gap-5 w-full md:w-153.5 ml-auto mr-auto'>
                        <h1 className={`${volkhov.className} md:text-[48px] text-[30px] text-[#484848] text-center`}>Follow us On Instagram</h1>
                        <p className=' text-[14px] md:text-[16px] text-center text-[#8A8A8A]'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin
                        </p>
                    </div>

                    <div className='w-screen relative left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center mt-10 md:mt-16 overflow-hidden'>
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
                                <Image key={index} src={image} width={400} height={400} alt={`Fashion look ${index + 1} from Instagram`} className={`w-[14.2857vw] shrink-0 object-cover ${index % 2 === 0 ? 'h-[16.15vw]' : 'h-[19.9vw]'}`} />
                            ))
                        }
                    </div>

                    <div aria-label="Instagram fashion gallery" className='w-screen relative left-1/2 -translate-x-1/2 md:hidden flex items-center mt-8 overflow-x-auto hide-scrollbar snap-x snap-mandatory'>
                        <div className='flex w-max items-center'>
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
                                    <Image key={index} src={image} width={200} height={240} alt={`Fashion look ${index + 1} from Instagram`} className={`w-32 shrink-0 snap-center object-cover ${index % 2 === 0 ? 'h-32' : 'h-40'}`} />
                                ))
                            }
                        </div>
                    </div>

                </div>
            </section>

        </div>
    )
}

export default FollowUs
