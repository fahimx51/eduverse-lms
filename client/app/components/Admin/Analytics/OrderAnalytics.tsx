"use client"

import React from 'react'
import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Area,
    AreaChart,
} from 'recharts';

import { useTheme } from 'next-themes';
import { useGetOrdersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import Loader from '../../Loader/Loader';
import { styles } from '@/app/styles/style';

export default function OrderAnalytics() {
    const { data, isLoading } = useGetOrdersAnalyticsQuery({});
    const { theme } = useTheme();

    const isDark = theme === "dark";

    // Extracting data based on the standard 12-month analytics format
    const analyticsData = data?.orders?.last12Months || [];

    return (
        <div className="w-full p-6 mt-[80px]">
            <div className="mb-8">
                <h1 className={`${styles.title} !text-start`}>
                    Orders Analytics
                </h1>
                <p className={`${styles.label}`}>
                    Visualizing sales and order trends over the last 12 months
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
                        <AreaChart
                            data={analyticsData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20, // Increased to prevent Y-Axis cutoff
                                bottom: 10,
                            }}
                        >
                            <defs>
                                <linearGradient
                                    id="colorOrders"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#a855f7" // Purple theme for Orders
                                        stopOpacity={0.4}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#a855f7"
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
                                    backgroundColor: isDark ? "#1F2A40" : "#fff",
                                    border: "none",
                                    borderRadius: "10px",
                                    color: isDark ? "#fff" : "#000",
                                }}
                            />

                            <Area
                                type="monotone"
                                dataKey="count"
                                stroke="#a855f7"
                                fillOpacity={1}
                                fill="url(#colorOrders)"
                                strokeWidth={3}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    )
}