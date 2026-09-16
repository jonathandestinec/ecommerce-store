import { volkhov } from '@/styles/fonts'
import Image from 'next/image'
import React from 'react'
import Button from './button';

interface NavLinks {
    text: string;
    url: string;
}

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
        <div className=' md:hidden flex  items-center justify-between'>

        </div>
    )
}


const DesktopNav = () => {

    return (
        <div className=' md:flex hidden  items-center justify-between'>
            {/* Logo */}
            <h1 className={`text-[52px] ${volkhov.className}`}>
                FASCO
            </h1>

            {/* Links */}
            <ul className=' flex items-center justify-between gap-14.5'>
                {
                    links.map((i) => (
                        <li key={i.url} className=' text-[16px]'>
                            {
                                i.text === "Signup" ? (
                                    <Button text='Signup' />
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