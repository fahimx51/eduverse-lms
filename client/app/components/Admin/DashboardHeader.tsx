"use client";

import { useState } from "react";
import ThemeSwitcher from "@/app/utils/ThemeSwitcher";
import { RootState } from "@/redux/store/store";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux";


export default function DashboardHeader() {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full flex items-center justify-end p-4 fixed top-0 right-0 z-10 shadow-sm dark:shadow-md dark:bg-slate-900/60 dark:backdrop:blur-lg ">
            <ThemeSwitcher />
            <div
                className="relative cursor-pointer m-2"
                onClick={() => setOpen(!open)}
            >
                <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
                <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
                    3
                </span>
            </div>

            {open && (
                <div className="w-[350px] h-[50vh] dark:bg-[#111C43] bg-slate-100 shadow-xl absolute top-16 z-10 rounded">
                    <h5 className="text-center text-[18px] font-Poppins text-black font-bold dark:text-white p-3">
                        Notifications
                    </h5>

                    {/* Notification Item */}
                    <div className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f] p-2 rounded-lg">
                        <div className="w-full flex items-center justify-between p-2">
                            <p className="text-black dark:text-white font-bold">New Question Received</p>
                            <p className="text-black dark:text-white cursor-pointer">
                                Mark as read
                            </p>
                        </div>
                        <p className="px-2 text-black dark:text-white">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt,
                            sequi! Tempore libero omnis et, ea beatae ut, itaque.
                        </p>
                        <p className="p-2 text-black dark:text-white text-[14px]">
                            5 days ago
                        </p>
                    </div>

                    {/* Repeat Notification Item for testing */}
                    <div className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f] p-2 mt-1 rounded-lg">
                        <div className="w-full flex items-center justify-between p-2">
                            <p className="text-black dark:text-white font-bold">New Question Received</p>
                            <p className="text-black dark:text-white cursor-pointer">
                                Mark as read
                            </p>
                        </div>
                        <p className="px-2 text-black dark:text-white">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        </p>
                        <p className="p-2 text-black dark:text-white text-[14px]">
                            5 days ago
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};