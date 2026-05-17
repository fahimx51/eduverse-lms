"use client"

import React, { useEffect, useState } from 'react'
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { redirect, useParams } from 'next/navigation';
import Loader from '../Loader/Loader';
import CourseContent from './CourseContent';
import Header from '../Header';

export default function Wrapper() {

    const { isLoading, error, data } = useLoadUserQuery(undefined, {});
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [route, setRoute] = useState("Login");

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
                    <>
                        <Header activeItem={1} open={open} setOpen={setOpen} route={route} setRoute={setRoute} />
                        <CourseContent user={data.user} />
                    </>
            }
        </>
    )
}
