import Courses from './components/Courses/Courses';
import Header from './components/Header';
import Hero from './components/Hero';
import type { Metadata } from 'next'
import Reviews from './components/Review/Reviews';
import FAQ from './components/FAQ/FAQ';
import Footer from './components/Footer/Footer';

export const metadata: Metadata = {
  title: 'EduVerse',
  description: 'Elearning platform for students to learn and get help from teachers',
  keywords: 'Programming, Web Development, Machine Learning, MERN Stack'
}

export default function Page() {

  return (
    // Added h-screen and overflow-hidden here to lock the viewport
    <div className="w-full bg-white dark:bg-slate-950/90">
      {/* <Header /> */}
      <Hero />
      <Courses isHome={true} />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  )
}