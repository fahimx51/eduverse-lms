"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import NavItems from '../utils/NavItems';
import ThemeSwitcher from '../utils/ThemeSwitcher';
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from '../utils/CustomModal';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Verification from './Auth/Verification';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useSocialAuthMutation } from '../../redux/features/auth/authApi';
import { toast } from 'react-hot-toast';
import { RootState } from '@/redux/store/store';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function Header() {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(0);
    const [route, setRoute] = useState('Login');
    const [active, setActive] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

    const { user } = useSelector((state: RootState) => state.auth);
    const [socialAuth] = useSocialAuthMutation();

    const { data } = useSession();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    // Track login trigger & target path from URL params
    useEffect(() => {
        const loginQuery = searchParams.get("login");
        const targetUrl = searchParams.get("redirectUrl");

        if (user) {
            setOpen(false);
            setRedirectUrl(null);
        } else if (loginQuery === "true") {
            setRoute("Login");
            setOpen(true);
            if (targetUrl) {
                setRedirectUrl(targetUrl);
            }
        }
    }, [searchParams, user]);

    // Handle Google / GitHub Auth Redirect
    useEffect(() => {
        const handleSocialAuth = async () => {
            if (!user && data) {
                try {
                    await socialAuth({
                        email: data.user?.email,
                        name: data.user?.name,
                        avatar: data.user?.image
                    }).unwrap();

                    toast.success("Logged in successfully");
                    setOpen(false);

                    // If user was trying to visit a protected route, send them there
                    const targetUrl = searchParams.get("redirectUrl");
                    if (targetUrl) {
                        router.push(targetUrl);
                    } else {
                        // Clean up search query parameters from URL
                        router.replace(pathname);
                    }
                } catch (error) {
                    console.error("Social auth failed:", error);
                }
            }
        };

        handleSocialAuth();
    }, [data, user, socialAuth, searchParams, router, pathname]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setActive(true);
            } else {
                setActive(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClose = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.id === "screen") {
            setOpenSidebar(false);
        }
    };

    return (
        <div className="w-full h-[80px] fixed top-0 left-0 z-[10000]">
            <div className={`${active
                ? "w-full h-[80px] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500 bg-white dark:bg-[#0f172a]"
                : "w-full border-b dark:border-[#ffffff1c] h-[80px] dark:shadow bg-white dark:bg-[#0f172a]"
                }`}>
                <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
                    <div className='w-full h-[80px] flex items-center justify-between p-3'>
                        <div>
                            <Link href="/" className='text-[25px] font-poppins text-black dark:text-white'>
                                EduVerse
                            </Link>
                        </div>
                        <div className='flex items-center'>
                            <NavItems isMobile={false} />
                            <ThemeSwitcher />

                            <div className='800px:hidden'>
                                <HiOutlineMenuAlt3
                                    size={25}
                                    className='cursor-pointer dark:text-white text-black'
                                    onClick={() => setOpenSidebar(true)}
                                />
                            </div>

                            {user ? (
                                <Link href="/profile">
                                    <Image
                                        src={user?.avatar?.url || "/avatar.jpeg"}
                                        width={30}
                                        height={30}
                                        alt='profile_image'
                                        className={`rounded-full cursor-pointer ${pathname === '/profile' && "border-[2px] border-blue-600 dark:border-[#ffc107]"}`}
                                    />
                                </Link>
                            ) : (
                                <HiOutlineUserCircle
                                    size={25}
                                    className='hidden 800px:block cursor-pointer dark:text-white text-black'
                                    onClick={() => {
                                        setRedirectUrl(null);
                                        setOpen(true);
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {openSidebar && (
                    <div
                        className='fixed w-full h-screen top-0 left-0 z-[9999] bg-[#00000024]'
                        onClick={handleClose}
                        id="screen"
                    >
                        <div className='w-[70%] fixed z-[10000] h-screen bg-white dark:bg-slate-900/90 backdrop-blur-sm top-0 right-0'>
                            <NavItems activeItem={activeItem} isMobile={true} />
                            <HiOutlineUserCircle
                                size={25}
                                className='cursor-pointer ml-5 my-2 dark:text-white text-black'
                                onClick={() => {
                                    setRedirectUrl(null);
                                    setOpen(true);
                                }}
                            />
                            <p className='absolute bottom-2 text-[16px] px-2 pl-5 text-black dark:text-white'>Copyright © 2026 EduVerse</p>
                        </div>
                    </div>
                )}
            </div>

            {route === "Login" && open && (
                <CustomModal
                    open={open}
                    setOpen={setOpen}
                    activeItem={activeItem}
                    component={Login}
                    setRoute={setRoute}
                    redirectUrl={redirectUrl}
                />
            )}

            {route === "Sign-Up" && open && (
                <CustomModal
                    open={open}
                    setOpen={setOpen}
                    activeItem={activeItem}
                    component={SignUp}
                    setRoute={setRoute}
                />
            )}

            {route === "Verification" && open && (
                <CustomModal
                    open={open}
                    setOpen={setOpen}
                    activeItem={activeItem}
                    component={Verification}
                    setRoute={setRoute}
                />
            )}
        </div>
    );
}