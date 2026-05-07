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
import { useSelector } from 'react-redux'
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useSocialAuthMutation } from '../../redux/features/auth/authApi';
import { toast } from 'react-hot-toast';
import { RootState } from '@/redux/store/store';
import { usePathname } from 'next/navigation';

export default function Header() {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(0);
    const [route, setRoute] = useState('Login');
    const [active, setActive] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const { user } = useSelector((state: RootState) => state.auth);
    const [socialAuth, { isSuccess }] = useSocialAuthMutation();

    const { data } = useSession();
    const pathname = usePathname();

    useEffect(() => {
        const handleSocialAuth = async () => {
            // 1. Only run if we have NextAuth data AND Redux is empty
            if (!user && data) {
                try {
                    // 2. Wait for the API to finish
                    await socialAuth({
                        email: data.user?.email,
                        name: data.user?.name,
                        avatar: data.user?.image
                    }).unwrap();

                    // 3. ONLY toast once the promise resolves
                    toast.success("Logged in successfully");
                } catch (error) {
                    console.error("Social auth failed:", error);
                }
            }
        };

        handleSocialAuth();
    }, [data, user]); // Note: We do NOT put isSuccess here anymore


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

                            {
                                user ? (
                                    <Link href="/profile" >
                                        <Image
                                            src={user?.avatar?.url || "/avatar.jpeg"}
                                            width={30}
                                            height={30}
                                            alt='profile_image'
                                            className={`rounded-full cursor-pointer ${pathname === '/profile'  && "border-[2px] border-blue-600 dark:border-[#ffc107]" }`}
                                        >

                                        </Image>
                                    </Link>
                                ) : (
                                    <HiOutlineUserCircle
                                        size={25}
                                        className='hidden 800px:block cursor-pointer dark:text-white text-black'
                                        onClick={() => setOpen(true)}
                                    />
                                )
                            }

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
