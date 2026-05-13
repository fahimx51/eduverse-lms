import React from 'react'
import type { Metadata } from 'next'
import AdminProtected from '@/app/hooks/adminProtected';
import DashboardHero from '@/app/components/Admin/DashboardHero';
import AdminSidebar from '../../components/Admin/AdminSidebar'
import EditHero from '@/app/components/Admin/Customization/EditHero';

export const metadata: Metadata = {
    title: 'Hero | Eduverse',
    description: 'Elearning platform for students to learn and get help from teachers',
    keywords: 'Programming, Web Development, Machine Learning, MERN Stack'
}

export default function page() {
    return (
        <AdminProtected>
            <div className='flex h-[200vh]'>
                <div className='1500px:w-[16%] w-1/5'>
                    <AdminSidebar />
                </div>
                <div className='w-[85%]'>
                    <DashboardHero />
                    <EditHero />
                </div>
            </div>
        </AdminProtected>
    )
}
