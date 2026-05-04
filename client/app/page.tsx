'use client'

import React, { useState } from 'react'
import Heading from './utils/Heading'
import Header from './components/Header';

interface Props {
  data: string;
}

export default function Page(props: Props) {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  return (
    <div>
      <Heading title="EduVerse"
        description="Elearning platform for students to learn and get help from teachers"
        keywords="Programming, Web Development, Machine Learning, MERN Stack" />

      <Header open={open} setOpen={setOpen} activeItem={activeItem} />
    </div>
  )
}
