'use client'

import React, { useState } from 'react'
import Heading from './utils/Heading'
import Header from './components/Header';
import Hero from './components/Hero';

interface Props {
  data: string;
}

export default function Page(props: Props) {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);

  return (
    // Added h-screen and overflow-hidden here to lock the viewport
    <div className="w-full h-screen overflow-hidden bg-white dark:bg-black">
      <Heading
        title="EduVerse"
        description="Elearning platform for students to learn and get help from teachers"
        keywords="Programming, Web Development, Machine Learning, MERN Stack"
      />

      <Header open={open} setOpen={setOpen} activeItem={activeItem} />

      {/* 
          Ensure your Hero component inside is using 
          h-[calc(100vh-80px)] to fit perfectly 
      */}
      <Hero />
    </div>
  )
}