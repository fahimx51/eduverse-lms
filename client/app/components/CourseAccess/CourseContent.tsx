"use client"

import React, { useState } from 'react'
import { useGetCourseContentQuery } from '@/redux/features/courses/coursesApi';
import { useParams } from 'next/navigation';
import Loader from '../Loader/Loader';
import CourseContentMedia from './CourseContentMedia';
import CourseContentList from '../Courses/CourseContentList';
import { User } from '@/app/types/UserType';

type Props = {
    user: User;
}

export default function CourseContent({ user }: Props) {


    const [activeVideo, setActiveVideo] = useState(0);

    const { id } = useParams();
    const { data: contentData, isLoading, refetch } = useGetCourseContentQuery({ id }, { refetchOnMountOrArgChange: true });
    const data = contentData?.content;
    
    return (
        <>
            {
                isLoading ? <Loader /> :
                    <>
                        <div className="w-full grid 800px:grid-cols-10">
                            <div className="col-span-7">
                                <CourseContentMedia
                                    data={data}
                                    id={id}
                                    activeVideo={activeVideo}
                                    setActiveVideo={setActiveVideo}
                                    user={user}
                                    refetch={refetch}
                                />
                            </div>
                            <div className="hidden 800px:block 800px:col-span-3">
                                <CourseContentList
                                    setActiveVideo={setActiveVideo}
                                    data={data}
                                    activeVideo={activeVideo}
                                />
                            </div>
                        </div>
                    </>
            }
        </>
    )
}
