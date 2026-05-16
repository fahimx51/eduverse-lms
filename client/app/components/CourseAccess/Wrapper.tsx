"use client"

import React, { useEffect } from 'react'
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { redirect, useParams } from 'next/navigation';
import Loader from '../Loader/Loader';
import CourseContent from './CourseContent';

export default function Wrapper() {

    const { isLoading, error, data } = useLoadUserQuery(undefined, {});
    const { id } = useParams();

    useEffect(() => {
        if (data) {
            const isPurchased = data && data?.user?.courses?.find((item: any) => item.courseId === id);

            if (!isPurchased) {
                redirect("/");
            }
            if (error) {
                redirect("/");
            }
        }
    }, [data, error]);

    return (
        <>
            {
                isLoading ? <Loader /> :
                    <div>
                        <CourseContent />
                    </div>
            }
        </>
    )
}
