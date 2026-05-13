import React from 'react'
import type { Metadata } from 'next'
import CourseAnalytics from '@/app/components/Admin/Analytics/CourseAnalytics';
import AdminProtected from '@/app/hooks/adminProtected';
import DashboardHero from '@/app/components/Admin/DashboardHero';
import AdminSidebar from "../../components/Admin/AdminSidebar"
import OrderAnalytics from '@/app/components/Admin/Analytics/OrderAnalytics';

export const metadata: Metadata = {
    title: 'Order-Anaylytics | Eduverse',
    description: 'Elearning platform for students to learn and get help from teachers',
    keywords: 'Programming, Web Development, Machine Learning, MERN Stack'
}

export default function page() {
    return (
        <AdminProtected>
            <div className='flex h-screen'>
                <div className='1500px:w-[16%] w-1/5'>
                    <AdminSidebar />
                </div>
                <div className='w-[85%]'>
                    <DashboardHero />
                    <OrderAnalytics />
                </div>
            </div>
        </AdminProtected>
    )
}
