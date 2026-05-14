import React from 'react'
import type { Metadata } from 'next'
import AdminProtected from '@/app/hooks/adminProtected';
import AdminSidebar from "../../components/Admin/AdminSidebar"
import DashboardHero from "../../components/Admin/DashboardHero"
import AllUsers from '@/app/components/Admin/Users/AllUsers';

export const metadata: Metadata = {
    title: 'Users | EduVerse',
    description: 'Elearning platform for students to learn and get help from teachers',
    keywords: 'Programming, Web Development, Machine Learning, MERN Stack'
}

export default function page() {
    return (
        <AdminProtected>
            <div className='flex mb-2'>
                <div className='1500px:w-[16%] w-1/5'>
                    <AdminSidebar />
                </div>
                <div className='w-[85%]'>
                    <DashboardHero />
                    <AllUsers />
                </div>
            </div>
        </AdminProtected>
    )
}
