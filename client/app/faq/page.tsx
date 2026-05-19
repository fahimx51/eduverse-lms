import React from 'react'
import FaqWrapper from '../components/Wrappers/FaqWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | EduVerse',
  description: 'Elearning platform for students to learn and get help from teachers',
  keywords: 'Programming, Web Development, Machine Learning, MERN Stack'
}

export default function page() {
    return (
        <div>
            <FaqWrapper />
        </div>
    )
}
