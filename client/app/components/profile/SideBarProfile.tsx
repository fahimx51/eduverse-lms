import { User } from '@/app/types/UserType';
import Image from 'next/image';
import React from 'react'
import defaultAvatar from '../../../public/avatar.jpeg'
import { RiLockPasswordLine } from 'react-icons/ri';
import { SiCoursera } from 'react-icons/si';
import { AiOutlineLogout } from 'react-icons/ai';

type Props = {
    user: User | null,
    avatar: string | null,
    active: number,
    setActive: (active: number) => void,
    logoutHandler: () => void
}

export default function SideBarProfile({ user, avatar, active, setActive, logoutHandler }: Props) {
    return (
        <div className='w-full'>
            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1 ? "bg-gray-100 dark:bg-slate-800" : "bg-transparent"}`}
                onClick={() => setActive(1)}
            >
                <Image
                    src={user?.avatar?.url || avatar || defaultAvatar}
                    width={20}
                    height={20}
                    alt='image'
                    className='800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full'
                >

                </Image>

                <h5 className='pl-2 800px:block hidden text-black dark:text-white font-poppins'>
                    My Account
                </h5>
            </div>

            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 2 ? "bg-gray-100 dark:bg-slate-800" : "bg-transparent"}`}
                onClick={() => setActive(2)}
            >
                <RiLockPasswordLine size={20} className='text-black dark:text-white' />
                <h5 className='pl-2 800px:block hidden text-black dark:text-white'>
                    Change Password
                </h5>

            </div>

            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 3 ? "bg-gray-100 dark:bg-slate-800" : "bg-transparent"}`}
                onClick={() => setActive(3)}
            >
                <SiCoursera size={20} className='text-black dark:text-white' />
                <h5 className='pl-2 800px:block hidden text-black dark:text-white'>
                    Enrolled Courses
                </h5>

            </div>

            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 4 ? "bg-gray-100 dark:bg-slate-800" : "bg-transparent"}`}
                onClick={() => logoutHandler()}
            >
                <AiOutlineLogout size={20} className='text-black dark:text-white' />
                <h5 className='pl-2 800px:block hidden text-black dark:text-white'>
                    Logout
                </h5>

            </div>
        </div>
    )
}
