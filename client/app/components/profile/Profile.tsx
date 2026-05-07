"use client"
import React, { useEffect, useState } from 'react'
import SideBarProfile from './SideBarProfile';
import { useSelector } from 'react-redux';
import { RootState } from "../../../redux/store/store"
import { User } from '@/app/types/UserType';
import { useLogOutQuery } from '../../../redux/features/auth/authApi'
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { toast } from 'react-hot-toast';
import ProfileInfo from './ProfileInfo';

export default function Profile() {
  const [scroll, setScroll] = useState(false);
  const [logout, setLogout] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);

  const { } = useLogOutQuery(undefined, {
    skip: !logout,
  });

  const logoutHandler = async () => {
    await signOut();
    setLogout(true);
    toast.success("Logout Success");
    redirect('/');
  }

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // 1. Added py-[80px] to create a consistent "buffer" from the header for everything
    <div className='w-[85%] flex mx-auto py-[80px] gap-10'>

      {/* Sidebar Container */}
      <div className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900/90 border dark:border-[#ffffff1d] border-[#ffffff16] rounded-[5px] shadow-xl dark:shadow-sm sticky transition-all duration-300 ${scroll ? "top-[100px]" : "top-[30px]"}`}>
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logoutHandler={logoutHandler}
        />
      </div>

      {/* 2. Content Area - Now it shares the same vertical spacing */}
      <div className="w-full h-full bg-transparent">
        {active === 1 && user && (
          <ProfileInfo user={user} />
        )}
      </div>

    </div>
  )
}