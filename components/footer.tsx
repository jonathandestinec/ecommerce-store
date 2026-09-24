import { volkhov } from '@/styles/fonts'
import React from 'react'
import Banner from './banner'
import FollowUs from './follow-us'
import NewsLetter from './newsletter'

const Footer = () => {
    return (
        <div>

            <Banner />
            <FollowUs />
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

export default Footer