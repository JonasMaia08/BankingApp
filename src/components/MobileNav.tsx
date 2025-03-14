'use client'
import React from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetClose,
    SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from '@/constants'
const MobileNav = ({ user }: MobileNavProps) => {
    const pathname = usePathname();
    return (
        <>
            <Sheet>
                <SheetTrigger>
                    <Image
                        src="/icons/hamburger.svg"
                        width={30}
                        height={30}
                        alt='menu'>
                    </Image>
                </SheetTrigger>
                <SheetContent className='border-none bg-white' side={'left'}>

                    <Link href="/"
                        className="flex
                    cursor-pointer
                    items-center gap-1 px-4">
                        <Image
                            src="/icons/logo.svg"
                            width={34} height={34}
                            alt='horizon logo'
                        />
                        <h1
                            className='sidebartext-26 font-ibm-plex-serif font-bold text-black-1'
                        >Bank</h1>
                    </Link>
                    <div className='mobilenav-sheet'>

                        <SheetClose asChild>
                            <nav className='flex flex-col h-full gap-6 pt-16 text-white'>
                                {sidebarLinks.map((item) => {
                                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}`)
                                    return (
                                        <SheetClose asChild key={item.route}>
                                        <Link
                                            href={item.route}
                                            key={item.label}
                                           
                                            className={cn('mobilenav-sheet_close w-full', { 'bg-bank-gradient': isActive })}
                                        >                                      
                                                <Image
                                                    src={item.imgURL}
                                                    alt={item.label}
                                                    width={20}
                                                    height={20}
                                                    className={cn({ 'brightness-[3] invert-0': isActive })}
                                                >
                                                </Image>
                                            <p className={cn('text-16 font-semibold text-black-2', { '!text-white': isActive })}>{item.label}</p>
                                        </Link>
                                        </SheetClose>
                                    )
                                })}
                                USER
                            </nav>
                        </SheetClose>
                        FOOTER
                    </div>

                </SheetContent>
            </Sheet>
        </>

    )
}

export default MobileNav
