import React from 'react'
import PolicyWrapper from '../components/Wrappers/PolicyWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Policy | EduVerse',
    description: 'Elearning platform for students to learn and get help from teachers',
    keywords: 'Programming, Web Development, Machine Learning, MERN Stack'
}

export default function Page() {
    return (
        <div>
            <PolicyWrapper />
        </div>
    )
}
