"use client"

import React from 'react'
import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Bar,
    Cell,
} from 'recharts';

import { useTheme } from 'next-themes';
import { useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import Loader from '../../Loader/Loader';
import { styles } from '@/app/styles/style';

export default function UserAnalytics() {
    const { data, isLoading } = useGetUsersAnalyticsQuery({});
    const { theme } = useTheme();

    const isDark = theme === "dark";

    // Extracting data from the users analytics endpoint
    const analyticsData = data?.users?.last12Months || [];

    return (
        <div className="w-full min-h-screen p-6 mt-[80px]">
            <div className="mb-8">
                <h1 className={`${styles.title} !text-start`}>
                    Users Analytics
                </h1>
                <p className={`${styles.label}`}>
                    Monthly user registration statistics for the past year
                </p>
            </div>

            {isLoading ? (
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
                                vertical={false} // Cleaner look for bar charts
                                stroke={isDark ? "#ffffff15" : "#00000010"}
                            />

                            <XAxis
                                dataKey="month"
                                stroke={isDark ? "#fff" : "#000"}
                                // Making the dates smaller as requested
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
                                radius={[4, 4, 0, 0]} // Rounded top corners
                            >
                                {analyticsData.map((entry: any, index: number) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fillOpacity={0.8}
                                        className="hover:opacity-100 transition-opacity cursor-pointer"
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    )
}