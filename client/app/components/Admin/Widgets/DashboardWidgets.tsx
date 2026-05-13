"use client"
import React from 'react'
import { BiBorderLeft } from 'react-icons/bi';
import { PiUsersFourLight } from 'react-icons/pi';
import UserAnalytics from '../Analytics/UserAnalytics';
import { Box, CircularProgress } from "@mui/material";

type Props2 = {
    open: boolean;
    value: number;
};

const CircularProgressWithLabel = ({ open, value }: Props2) => {
    return (
        <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
                variant="determinate"
                value={value}
                size={45}
                color={value && value > 99 ? "info" : "error"}
                thickness={4}
                style={{ zIndex: open ? -1 : 1 }}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            ></Box>
        </Box>
    );
};

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function DashboardWidgets({ open, setOpen }: Props) {
    return (
        <div className="mt-[30px]">
            {/* Top Section: Full Width Chart */}
            <div className="p-8">
                <UserAnalytics isDashboard={true} />
            </div>

            {/* Bottom Section: Side-by-Side Cards */}
            <div className="flex flex-row gap-5 p-8 pt-0">

                {/* Sales Obtained Card */}
                <div className="w-full dark:bg-[#111C43] rounded-sm shadow">
                    <div className="flex items-center p-5 justify-between">
                        <div className="">
                            <BiBorderLeft className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                            <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                                120
                            </h5>
                            <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                                Sales Obtained
                            </h5>
                        </div>
                        <div className="flex flex-col items-center">
                            <CircularProgressWithLabel value={100} open={open} />
                            <h5 className="text-center pt-4 text-black dark:text-white">+120%</h5>
                        </div>
                    </div>
                </div>

                {/* New Users Card */}
                <div className="w-full dark:bg-[#111C43] rounded-sm shadow">
                    <div className="flex items-center p-5 justify-between">
                        <div className="">
                            <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                            <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                                450
                            </h5>
                            <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                                New Users
                            </h5>
                        </div>
                        <div className="flex flex-col items-center">
                            <CircularProgressWithLabel value={100} open={open} />
                            <h5 className="text-center pt-4 text-black dark:text-white">+150%</h5>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}