"use client"

import React from 'react'
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Area,
    AreaChart,
} from 'recharts';

import { useTheme } from 'next-themes';
import { useGetCoursesAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import Loader from '../../Loader/Loader';

export default function CourseAnalytics() {

    const { data, isLoading } = useGetCoursesAnalyticsQuery({});
    const { theme } = useTheme();

    const isDark = theme === "dark";

    const analyticsData = data?.courses?.last12Months || [];

    return (
        <div className="w-full p-6 mt-[80px]">

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-black dark:text-white">
                    Course Analytics
                </h1>

                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Overview of course growth in the last 12 months
                </p>
            </div>

            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div
                        className={`
                            w-full 
                            h-[500px] 
                            rounded-2xl 
                            p-5
                            border
                            ${isDark
                                ? "bg-[#111C43] border-[#ffffff1c]"
                                : "bg-white border-gray-200"
                            }
                        `}
                    >

                        <ResponsiveContainer width="100%" height="100%">

                            <AreaChart
                                data={analyticsData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 0,
                                    bottom: 10,
                                }}
                            >

                                <defs>
                                    <linearGradient
                                        id="colorCourses"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#3b82f6"
                                            stopOpacity={0.4}
                                        />

                                        <stop
                                            offset="95%"
                                            stopColor="#3b82f6"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke={isDark ? "#ffffff15" : "#00000010"}
                                />

                                <XAxis
                                    dataKey="month"
                                    stroke={isDark ? "#fff" : "#000"}
                                    // Added fontSize here to make the dates smaller
                                    tick={{
                                        fill: isDark ? "#fff" : "#000",
                                        fontSize: 12, // Adjust this number as needed (e.g., 10 or 11)
                                    }}
                                    // Optional: add a slight interval or padding if labels still feel tight
                                    tickLine={false}
                                    axisLine={false}
                                />

                                <YAxis
                                    stroke={isDark ? "#fff" : "#000"}
                                    tick={{ fill: isDark ? "#fff" : "#000" }}
                                />

                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: isDark
                                            ? "#1F2A40"
                                            : "#fff",
                                        border: "none",
                                        borderRadius: "10px",
                                        color: isDark ? "#fff" : "#000",
                                    }}
                                />

                                <Area
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#3b82f6"
                                    fillOpacity={1}
                                    fill="url(#colorCourses)"
                                    strokeWidth={3}
                                />

                            </AreaChart>

                        </ResponsiveContainer>

                    </div>
                )
            }

        </div>
    )
}