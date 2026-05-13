import React from 'react'
import type { Metadata } from 'next'
import AdminProtected from '@/app/hooks/adminProtected';
import DashboardHero from '@/app/components/Admin/DashboardHero';
import AdminSidebar from "../../components/Admin/AdminSidebar"
import UserAnalytics from '@/app/components/Admin/Analytics/UserAnalytics';

export const metadata: Metadata = {
    title: 'Orders Anaylytics | Eduverse',
    description: 'Elearning platform for students to learn and get help from teachers',
    keywords: 'Programming, Web Development, Machine Learning, MERN Stack'
}

export default function page() {
    return (
        <AdminProtected>
            <div className='flex'>
                <div className='1500px:w-[16%] w-1/5'>
                    <AdminSidebar />
                </div>
                <div className='w-[85%]'>
                    <DashboardHero />
                    <UserAnalytics />
                </div>
            </div>
        </AdminProtected>
    )
}
