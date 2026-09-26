'use client'

import { useState } from 'react'
import Image from 'next/image'
import React from 'react'
import Button from './button'
import { volkhov } from '@/styles/fonts'
import { cn } from '@/lib/utils'

const NewsLetter
    = () => {
        const [message, setMessage] = useState('')
        return (
            <div>
                {/* Newsletter */}
                <section id="newsletter" className={cn('w-full h-max mt-10 md:mt-16 ml-auto mr-auto antialiased bg-white py-10 md:py-12 flex items-center justify-center')}>

                    {/* Inner */}
                    <div className='md:px-0 px-5'>
                        <div className='flex-col md:flex-row md:flex items-center justify-between ml-auto mr-auto w-full md:w-max'>

                            <Image src={"/assets/newsletter/man.png"} width={600} height={600} alt='Model wearing a camel coat' className='md:block hidden w-72 lg:w-88.75' />

                            {/* Copy */}
                            <div className='w-full h-max md:h-70 flex items-center justify-center'>
                                <div className='grid grid-cols-1 gap-2 md:gap-7.5 w-full md:w-170 ml-auto mr-auto'>
                                    <h1 className={`${volkhov.className} text-[30px] md:text-[46px] text-[#484848] text-center`}>Subscribe To Our Newsletter</h1>
                                    <p className=' text-[14px] md:text-[16px] text-center text-[#8A8A8A]'>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin
                                    </p>

                                    <form className="w-full" onSubmit={(event) => { event.preventDefault(); setMessage('Newsletter sign-up is not connected yet.') }}>
                                        <label className="sr-only" htmlFor="newsletter">Email address</label>
                                        <input required type="email" name="newsletter" id="newsletter" autoComplete="email" className='w-[90%] md:w-full shadow-[0_3.02px_3.15px_rgba(0,0,0,0.0096),0_13.28px_6.52px_rgba(0,0,0,0.0157),0_32.6px_13px_rgba(0,0,0,0.02),0_62.79px_25.48px_rgba(0,0,0,0.0243),0_105.65px_46.85px_rgba(0,0,0,0.0304),0_163px_80px_rgba(0,0,0,0.04)] ml-auto mr-auto text-[14px] md:text-[18px] text-[#8A8A8A] p-5 py-3 md:py-5 md:px-7 leading-6 flex items-center md:mt-0 mt-5' placeholder='michael@ymail.com' />
                                        <div className="mt-4 flex justify-center"><Button text='Subscribe Now' type="submit" className='md:mt-0' /></div>
                                        <p aria-live="polite" className="mt-3 min-h-5 text-center text-xs text-[#777]">{message}</p>
                                    </form>
                                </div>
                            </div>

                            <Image src={"/assets/newsletter/woman.png"} width={600} height={600} alt='Model wearing a grey coat' className='hidden md:block w-72 lg:w-88.75 place-self-center justify-self-center' />

                            <div className="mt-5 flex w-full items-end justify-center gap-2 md:hidden">
                                <Image src="/assets/newsletter/man.png" width={600} height={600} alt="Model wearing a camel coat" className="h-56 w-[44%] object-contain object-bottom" />
                                <Image src="/assets/newsletter/woman.png" width={600} height={600} alt="Model wearing a grey coat" className="h-56 w-[44%] object-contain object-bottom" />
                            </div>

                        </div>
                    </div>

                </section>
            </div>
        )
    }

export default NewsLetter
