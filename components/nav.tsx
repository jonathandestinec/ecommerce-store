import { volkhov } from '@/styles/fonts'
import Image from 'next/image'
import React from 'react'
import Button from './button';
import { NavLinks } from '@/types';
import { MenuIcon } from 'lucide-react';


const links: NavLinks[] = [
    { text: "Home", url: "/home" },
    { text: "Deals", url: "/deals" },
    { text: "New Arrivals", url: "/new" },
    { text: "Packages", url: "/packages" },
    { text: "Signin", url: "/signin" },
    { text: "Signup", url: "/signup" },
]


const MobileNav = () => {
    return (
        <div className=' md:hidden flex  items-center justify-between p-5'>
            {/* Logo */}
            <h1 className={`text-[32px] text-[#484848] ${volkhov.className}`}>
                FASCO
            </h1>

            {/* Hamburger */}
            <MenuIcon />
        </div>
    )
}


const DesktopNav = () => {

    return (
        <div className=' md:flex hidden items-center justify-between'>
            {/* Logo */}
            <h1 className={`text-[52px] text-[#484848] ${volkhov.className}`}>
                FASCO
            </h1>

            {/* Links */}
            <ul className=' flex items-center justify-between gap-14.5'>
                {
                    links.map((i) => (
                        <li key={i.url} className=' text-[16px]'>
                            {
                                i.text === "Signup" ? (
                                    <Button text='Signup' className='px-15.5' />
                                ) : (
                                    <a href={i.url}>{i.text}</a>
                                )
                            }
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

const Nav = () => {
    return (
        <>
            <MobileNav />
            <DesktopNav />
        </>
    )
}

export default Nav