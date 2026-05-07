import Header from './components/Header';
import Hero from './components/Hero';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EduVerse',
  description: 'Elearning platform for students to learn and get help from teachers',
  keywords: 'Programming, Web Development, Machine Learning, MERN Stack'
}

export default function Page() {

  return (
    // Added h-screen and overflow-hidden here to lock the viewport
    <div className="w-full h-screen overflow-hidden bg-white dark:bg-black">
      <Header />
      <Hero />
    </div>
  )
}