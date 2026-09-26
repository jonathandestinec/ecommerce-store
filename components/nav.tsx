"use client"

import { volkhov } from '@/styles/fonts'
import React, { useState } from 'react'
import Button from './button';
import { NavLinks } from '@/types';
import { MenuIcon, Search, ShoppingBag, Star, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const MobileNav = () => {
    const [open, setOpen] = useState(false)
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
        <div className='relative md:hidden flex items-center justify-between p-5'>
            {/* Logo */}
            <h1 className={`text-[32px] text-[#484848] ${volkhov.className}`}>
                FASCO
            </h1>

            <button type='button' aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((value) => !value)} className='rounded-full p-2 transition hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
                <MenuIcon aria-hidden='true' />
            </button>
            {open && (
                <nav aria-label='Mobile navigation' className='absolute inset-x-5 top-20 z-20 rounded-2xl bg-white p-5 shadow-xl'>
                    <ul className='flex flex-col gap-4 text-sm'>
                        {links.map((link) => <li key={link.url}><Link onClick={() => setOpen(false)} href={link.url} className='block py-1'>{link.text}</Link></li>)}
                    </ul>
                </nav>
            )}
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
