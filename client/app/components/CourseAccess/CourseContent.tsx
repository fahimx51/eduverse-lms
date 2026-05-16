"use client"

import { useGetCourseContentQuery } from '@/redux/features/courses/coursesApi';
import { useParams } from 'next/navigation';
import React from 'react'
import Loader from '../Loader/Loader';

export default function CourseContent() {

    const { id } = useParams();
    const { data, isLoading } = useGetCourseContentQuery({ id });
    return (
        <>
            {
                isLoading ? <Loader /> :
                    <div>

                    </div>
            }
        </>
    )
}
