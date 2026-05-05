"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import NavItems from '../utils/NavItems';
import ThemeSwitcher from '../utils/ThemeSwitcher';
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi"
import CustomModal from '../utils/CustomModal';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Verification from './Auth/Verification';

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
    route: string;
    setRoute: (route: string) => void;
}

export default function Header({ open, setOpen, activeItem, route, setRoute }: Props) {
    const [active, setActive] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setActive(true);
            } else {
                setActive(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Cleanup function to remove listener when component unmounts
        return () => window.removeEventListener("scroll", handleScroll);
    }, []); // Empty array means this runs ONLY ONCE

    const handleClose = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.id === "screen") {
            setOpenSidebar(false);
        }
    }

    return (
        <div className='w-full relative'>
            <div className={`${active ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500" : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow "}`}>
                <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
                    <div className='w-full h-[80px] flex items-center justify-between p-3'>
                        <div>
                            <Link href="/" className='text-[25px] font-poppins font-[500] text-black dark:text-white' >
                                EduVerse
                            </Link>
                        </div>
                        <div className='flex items-center'>
                            <NavItems
                                activeItem={activeItem}
                                isMobile={false}
                            />
                            <ThemeSwitcher />

                            {/* Only for Mobile */}
                            <div className='800px:hidden'>
                                <HiOutlineMenuAlt3
                                    size={25}
                                    className='cursor-pointer dark:text-white text-black'
                                    onClick={() => setOpenSidebar(true)}
                                />
                            </div>

                            <HiOutlineUserCircle
                                size={25}
                                className='hidden 800px:block cursor-pointer dark:text-white text-black'
                                onClick={() => setOpen(true)}
                            />
                        </div>
                    </div>
                </div>

                {/* mobile sidebar */}
                {
                    openSidebar && (
                        <div
                            className='fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]'
                            onClick={handleClose}
                            id="screen"
                        >

                            <div className='w-[70%] fixed z-[99999] h-screen bg-white dark:bg-slate-900/90 backdrop-blur-sm top-0 right-0'>
                                <NavItems
                                    activeItem={activeItem}
                                    isMobile={true}
                                />
                                <HiOutlineUserCircle
                                    size={25}
                                    className='cursor-pointer ml-5 my-2 dark:text-white text-black'
                                    onClick={() => setOpen(true)}
                                />
                                <p className='absolute bottom-2 text-[16px] px-2 pl-5 text-black dark:text-white'>Copyright © 2026 EduVerse</p>
                            </div>

                        </div>
                    )
                }
            </div>
            {
                route === "Login" && (
                    <>
                        {
                            open && (
                                <CustomModal
                                    open={open}
                                    setOpen={setOpen}
                                    activeItem={activeItem}
                                    component={Login}
                                    setRoute={setRoute}
                                />
                            )
                        }
                    </>
                )
            }

            {
                route === "Sign-Up" && (
                    <>
                        {
                            open && (
                                <CustomModal
                                    open={open}
                                    setOpen={setOpen}
                                    activeItem={activeItem}
                                    component={SignUp}
                                    setRoute={setRoute}
                                />
                            )
                        }
                    </>
                )
            }
            {
                route === "Verification" && (
                    <>
                        {
                            open && (
                                <CustomModal
                                    open={open}
                                    setOpen={setOpen}
                                    activeItem={activeItem}
                                    component={Verification}
                                    setRoute={setRoute}
                                />
                            )
                        }
                    </>
                )
            }
        </div>
    )
}
