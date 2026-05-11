import React from 'react'
import type { Metadata } from 'next'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import DashboardHeader from '@/app/components/Admin/DashboardHeader';
import CreateCourse from '@/app/components/Admin/Course/CreateCourse';
import AdminProtected from '@/app/hooks/adminProtected';

export const metadata: Metadata = {
    title: 'Create Course | Eduverse',
    description: 'Elearning platform for students to learn and get help from teachers',
    keywords: 'Programming, Web Development, Machine Learning, MERN Stack'
}

export default function page() {
    return (
        <AdminProtected>
            <div className="flex">
                <div className="1500px:w-[16%] w-1/5">
                    <AdminSidebar />
                </div>
                <div className="w-[85%]">
                    <DashboardHeader />
                    <CreateCourse />
                </div>
            </div>
        </AdminProtected>
    )
}
