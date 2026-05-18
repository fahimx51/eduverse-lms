"use client"

import { useGetUserAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import { styles } from '@/app/styles/style';
import CourseCard from './CourseCard';
import Footer from '../Footer/Footer';

export default function CoursesPageWrapper() {
    const searchParams = useSearchParams();
    const search = searchParams?.get("title");

    const { data, isLoading } = useGetUserAllCoursesQuery(undefined, {});
    const { data: categoriesData } = useGetHeroDataQuery("Categories", {});

    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const [courses, setcourses] = useState([]);
    const [category, setCategory] = useState("All");

    console.log(data?.courses);

    useEffect(() => {
        if (category === "All") {
            setcourses(data?.courses);
        }
        if (category !== "All") {
            setcourses(
                data?.courses.filter((item: any) => item.categories === category)
            );
        }
        if (search) {
            setcourses(
                data?.courses.filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase()))
            );
        }
    }, [data, category, search]);


    const categories = categoriesData?.layout.categories;

    return (
        <>
            {
                isLoading ? <Loader /> :
                    <div>
                        <div className="w-full flex items-center flex-wrap">
                            <div
                                className={`h-[35px] text-white ${category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"
                                    } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                                onClick={() => setCategory("All")}
                            >
                                All
                            </div>
                            {categories &&
                                categories.map((item: any, index: number) => (
                                    <div key={index}>
                                        <div
                                            className={`h-[35px] ${category === item.title
                                                ? "bg-[crimson]"
                                                : "bg-[#5050cb]"
                                                } text-white m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                                            onClick={() => setCategory(item.title)}
                                        >
                                            {item.title}
                                        </div>
                                    </div>
                                ))}
                        </div>
                        {
                            courses && courses.length === 0 && (
                                <p className={`${styles.label} justify-center min-h-[50vh] flex items-center`}>
                                    {search ? "No courses found!" : "No courses found in this category. Please try another one!"}
                                </p>
                            )
                        }
                        <br />
                        <br />

                        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:1500px:grid-cols-4 1500px:grid-cols-4 1500px:gap-[35px] 1500px:gap-[35px] mb-12 border-0 min-h-screen p-5">
                            {courses &&
                                courses.map((item: any, index: number) => (
                                    <CourseCard item={item} key={index} />
                                ))}
                        </div>
                        <Footer />
                    </div>
            }
        </>
    )
}
