import React from 'react'
import type { Metadata } from 'next'
import AdminProtected from '@/app/hooks/adminProtected';
import AdminSidebar from "../../components/Admin/AdminSidebar"
import DashboardHero from "../../components/Admin/DashboardHero"
import AllCourses from '@/app/components/Admin/Course/AllCourses';

export const metadata: Metadata = {
    title: 'Live Courses | EduVerse',
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
                <div className='w-[85%] mb-2'>
                    <DashboardHero />
                    <AllCourses />
                </div>
            </div>
        </AdminProtected>
    )
}
