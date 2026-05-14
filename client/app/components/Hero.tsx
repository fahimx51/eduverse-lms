'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineSearch } from 'react-icons/hi';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';

export default function Hero() {

    const { data } = useGetHeroDataQuery("Banner", {
        refetchOnMountOrArgChange: true
    });
   
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        // Added h-screen for mobile and overflow-hidden to kill the scrollbar
        <div className='w-full min-h-screen flex items-center  transition-colors duration-300 overflow-hidden'>
            <div className='w-[95%] 800px:w-[92%] m-auto 800px:flex items-center justify-between'>

                {/* Left Side: Hidden on Mobile to prevent page overflow */}
                <div className='hidden 800px:flex w-[45%] items-center justify-center relative h-full'>
                    {/* Animated background circle */}
                    <div className='hero_animation absolute w-[90%] aspect-square rounded-full blur-[100px] z-0 opacity-60 dark:opacity-60' />

                    <div className='z-[1] flex items-center justify-center'>
                        <Image
                            src={data?.layout?.banner?.image?.url || "/hero-image.png"}
                            alt="EduVerse Hero"
                            width={600}
                            height={600}
                            className='object-contain 1000px:max-w-[85%] 1500px:max-w-[95%] h-auto drop-shadow-2xl'
                            priority
                        />
                    </div>
                </div>

                {/* Right Side: Content */}
                <div className='w-full 800px:w-[50%] flex flex-col items-center 800px:items-start text-center 800px:text-left'>
                    <h1 className='text-[32px] 400px:text-[40px] 800px:text-[45px] 1100px:text-[55px] 1500px:text-[65px] font-extrabold text-slate-900 dark:text-white font-poppins leading-[40px] 400px:leading-[50px] 800px:leading-[55px] 1100px:leading-[70px]'>
                        {data?.layout?.banner?.title}
                    </h1>

                    <p className='text-slate-600 dark:text-[#ACACAC] font-josefin font-[400] text-[16px] 800px:text-[18px] mt-6 1100px:w-[80%] leading-[26px]'>
                        {data?.layout?.banner?.subTitle}
                    </p>

                    {/* Search Bar with Brand-Matching Ring */}
                    <div className='w-full 1100px:w-[90%] 1500px:w-[80%] relative mt-10 h-[55px]'>
                        <input
                            type="text"
                            placeholder='Search Courses...'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            // Ring color is now 60% opacity of your #23B6FF blue
                            className='bg-slate-100 dark:bg-[#2c2c2c] border-none outline-none w-full h-full rounded-[50px] px-6 text-black dark:text-white font-josefin text-[16px] font-[500] placeholder:text-slate-400 dark:placeholder:text-[#808080] transition-all duration-300 focus:ring-[2px] focus:ring-[#23B6FF]/40'
                        />
                        <button
                            onClick={handleSearch}
                            className='absolute flex items-center justify-center w-[55px] h-full right-0 top-0 bg-[#23B6FF] rounded-r-[50px] cursor-pointer text-white hover:bg-[#1DA1E2] transition-colors'
                        >
                            <HiOutlineSearch size={24} />
                        </button>
                    </div>

                    {/* Social Proof */}
                    <div className='w-full flex items-center justify-center 800px:justify-start mt-12'>
                        <div className='flex -space-x-3'>
                            {[1, 2, 3].map((i) => (
                                <div key={i} className='w-[40px] h-[40px] rounded-full border-[2px] border-white dark:border-black overflow-hidden bg-slate-200 dark:bg-slate-800 flex items-center justify-center'>
                                    <img
                                        src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${i + 77}`}
                                        alt="trusted-user"
                                        className='w-full h-full'
                                    />
                                </div>
                            ))}
                        </div>
                        <p className='text-slate-700 dark:text-white font-josefin text-[15px] 1100px:text-[17px] ml-4 font-[600]'>
                            500K+ People trusted us.
                            <Link href="/courses" className='text-blue-600 dark:text-[#32FF57] ml-2 font-[600] hover:underline'>
                                View Courses
                            </Link>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}