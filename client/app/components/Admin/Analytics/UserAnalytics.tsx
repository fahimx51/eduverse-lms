"use client"

import React, { FC } from 'react'
import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Bar,
} from 'recharts';

import { useTheme } from 'next-themes';
import { useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import Loader from '../../Loader/Loader';
import { styles } from '@/app/styles/style';

type Props = {
    isDashboard?: boolean;
}

const UserAnalytics: FC<Props> = ({ isDashboard }) => {
    const { data, isLoading } = useGetUsersAnalyticsQuery({});
    const { theme } = useTheme();

    const isDark = theme === "dark";

    // Extracting data from the users analytics endpoint
    const analyticsData = data?.users?.last12Months || [];

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div
                    className={`${!isDashboard
                        ? "mt-[80px] w-full min-h-screen p-6"
                        : "w-full"
                        }`}
                >
                    {/* Only show headers if NOT in dashboard mode */}
                    {!isDashboard ? (
                        <div className="mb-8">
                            <h1 className={`${styles.title} !text-start`}>
                                Users Analytics
                            </h1>
                            <p className={`${styles.label}`}>
                                Monthly user registration statistics for the past year
                            </p>
                        </div>
                    ) : (
                        <h1 className="text-xl font-bold text-white dark:text-blue-500 mb-4">User Analytics</h1>
                    )
                }

                    <div
                        className={`
                            w-full 
                            ${isDashboard ? "h-[30vh]" : "h-[500px]"} 
                            rounded-2xl 
                            ${!isDashboard ? "p-5 border" : ""}
                            ${isDark
                                ? "bg-[#111C43] border-[#ffffff1c]"
                                : "bg-white border-gray-200"
                            }
                        `}
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={analyticsData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 10,
                                }}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    stroke={isDark ? "#ffffff15" : "#00000010"}
                                />

                                <XAxis
                                    dataKey="month"
                                    stroke={isDark ? "#fff" : "#000"}
                                    tick={{
                                        fill: isDark ? "#fff" : "#000",
                                        fontSize: 12
                                    }}
                                    tickLine={false}
                                    axisLine={false}
                                />

                                <YAxis
                                    stroke={isDark ? "#fff" : "#000"}
                                    tick={{
                                        fill: isDark ? "#fff" : "#000",
                                        fontSize: 12
                                    }}
                                    tickLine={false}
                                    axisLine={false}
                                />

                                <Tooltip
                                    cursor={{ fill: isDark ? "#ffffff05" : "#00000005" }}
                                    contentStyle={{
                                        backgroundColor: isDark ? "#1F2A40" : "#fff",
                                        border: "none",
                                        borderRadius: "10px",
                                        color: isDark ? "#fff" : "#000",
                                    }}
                                />

                                <Bar
                                    dataKey="count"
                                    fill="#00C49F"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </>
    )
}

export default UserAnalytics;