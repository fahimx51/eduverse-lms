import React from 'react'
import CourseCard from '../Courses/CourseCard';

export default function EnrolledCourses({ courses }) {
    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-[10px]">
            {
                courses.map((course: any, index: number) =>
                    <>
                        <CourseCard item={course} />
                    </>
                )
            }
        </div>
    )
}
