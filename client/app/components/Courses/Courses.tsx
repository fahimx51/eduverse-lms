"use client"

import { useGetUserAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard';

export default function Courses() {

    const { data, isLoading } = useGetUserAllCoursesQuery({});

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        setCourses(data?.courses);

    }, [data]);

    return (
        <div>
            <div className={`w-[90%] 800px:w-[80%] m-auto`}>
                <h1 className="text-center font-poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight">
                    Expand Your Career {" "}
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        Opportunity
                    </span> <br />
                    With Our Courses
                </h1>
                <br />
                <br />

                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
                    {courses && courses.map((item: any, index: number) => (
                        <CourseCard
                            item={item}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
