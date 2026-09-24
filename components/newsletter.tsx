import Image from 'next/image'
import React from 'react'
import Button from './button'
import { volkhov } from '@/styles/fonts'
import { cn } from '@/lib/utils'

const NewsLetter
    = () => {
        return (
            <div>
                {/* Newsletter */}
                <section className={cn('w-full h-max mt-10 md:mt-25 ml-auto mr-auto ${poppins.className} antialiased bg-white py-13.75 flex items-center justify-center')}>

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
            </div>
        )
    }

export default NewsLetter
