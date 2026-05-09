import React from 'react'
import type { Metadata } from 'next'
import AdminSidebar from '../components/Admin/AdminSidebar';
import DashboardHero from '../components/Admin/DashboardHero';

export const metadata: Metadata = {
    title: 'Admin | Eduverse',
    description: 'Elearning platform for students to learn and get help from teachers',
    keywords: 'Programming, Web Development, Machine Learning, MERN Stack'
}

export default function page() {
    return (
        <div className='flex h-[200vh]'>
            <div className='1500px:w-[16%] w-1/5'>
                <AdminSidebar />
            </div>
            <div className='w-[85%]'>
                <DashboardHero />
            </div>
        </div>
    )
}
