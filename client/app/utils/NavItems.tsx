"use client";
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

type Props = {
    isMobile: boolean;
};

export const navItemsData = [
    { name: "Home", url: "/" },
    { name: "Courses", url: "/courses" },
    { name: "About", url: "/about" },
    { name: "Policy", url: "/policy" },
    { name: "FAQ", url: "/faq" },
];

export default function NavItems({ isMobile }: Props) {
    const pathname = usePathname();

    return (
        <>
            <div className='hidden 800px:flex'>
                {navItemsData.map((item, index) => (
                    <Link href={item.url} key={index} passHref>
                        <span className={`${pathname === item.url
                            ? "dark:text-[#37a39a] text-[crimson]"
                            : "dark:text-white text-black"
                            } font-poppins text-[18px] px-6 font- cursor-pointer`}>
                            {item.name}
                        </span>
                    </Link>
                ))}
            </div>

            {isMobile && (
                <div className='800px:hidden mt-5'>
                    {/* ... your mobile title ... */}
                    {navItemsData.map((item, index) => (
                        <Link href={item.url} key={index} passHref>
                            <span className={`${pathname === item.url
                                ? "dark:text-[#37a39a] text-[crimson]"
                                : "dark:text-white text-black"
                                } block font-poppins text-[18px] py-5 px-6 font-`}>
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}