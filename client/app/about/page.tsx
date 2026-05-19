import React from 'react'
import AboutWrapper from '../components/Wrappers/AboutWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | EduVerse',
  description: 'Elearning platform for students to learn and get help from teachers',
  keywords: 'Programming, Web Development, Machine Learning, MERN Stack'
}

export default function Page() {
    return (
        <div>
            <AboutWrapper />
        </div>
    )
}
