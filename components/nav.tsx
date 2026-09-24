"use client"

import { volkhov } from '@/styles/fonts'
import Image from 'next/image'
import React from 'react'
import Button from './button';
import { NavLinks } from '@/types';
import { MenuIcon, PersonStanding, Search, ShoppingBag, Star, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const MobileNav = () => {

    const pathname = usePathname()

    const links: NavLinks[] = pathname !== "/" ? [
        { text: "Home", url: "/home" },
        { text: "Deals", url: "/deals" },
        { text: "New Arrivals", url: "/new" },
        { text: "Packages", url: "/packages" },
        { text: "Signin", url: "/signin" },
        { text: "Signup", url: "/signup" },
    ] : [
        { text: "Home", url: "/home" },
        { text: "Deals", url: "/deals" },
        { text: "New Arrivals", url: "/new" },
        { text: "Packages", url: "/packages" },
        { text: "Signin", url: "/signin" },
        { text: "Signup", url: "/signup" },
    ]

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

    const pathname = usePathname()

    const links: NavLinks[] = pathname !== "/" ? [
        { text: "Home", url: "/" },
        { text: "Shop", url: "/fashion" },
        { text: "Products", url: "/products" },
        { text: "Pages", url: "/pages" },
    ] : [
        { text: "Home", url: "/" },
        { text: "Deals", url: "/deals" },
        { text: "New Arrivals", url: "/new" },
        { text: "Packages", url: "/packages" },
        { text: "Signin", url: "/signin" },
        { text: "Signup", url: "/signup" },
    ]

    return (
        <div className=' md:flex hidden items-center justify-between'>
            {/* Logo */}
            <Link href={"/"}>
                <h1 className={`text-[52px] text-[#484848] ${volkhov.className}`}>
                    FASCO
                </h1>
            </Link>

            {/* Links */}
            <ul className=' flex items-center justify-between gap-14.5'>
                {
                    links.map((i) => (
                        <li key={i.url} className={cn('text-[16px]',
                            pathname != "/" && pathname === i.url ? "border-b w-12 flex items-center justify-center pb-1" : "no-underline"
                        )}>
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

            {/* Icon Buttons */}
            <div className={cn('flex items-center justify-between gap-3.25',
                pathname === "/" ? "hidden" : "flex"
            )}>
                <Search className='text-[#484848]' />
                <User className='text-[#484848]' />
                <Star className='text-[#484848]' />
                <ShoppingBag className='text-[#484848]' />
            </div>
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