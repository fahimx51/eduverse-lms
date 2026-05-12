'use client'

import React, { useEffect, useState } from 'react'
import CourseInformation from './CourseInformation';
import CourseOptions from './CourseOptions';
import CourseData from './CourseData';
import CourseContent from './CourseContent';
import CoursePreview from './CoursePreview';
import { useEditCourseMutation, useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import { toast } from 'react-hot-toast';
import { redirect, useParams } from 'next/navigation';
import { router } from 'next/client';

export default function EditCourse() {

    const { id } = useParams();

    const { data } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
    const [editCourse, { isSuccess, error, isLoading }] = useEditCourseMutation();

    const [active, setActive] = useState(0);

    const editCourseData = data && data.courses.find((i: any) => i._id === id);
    console.log(editCourseData);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Course updated successfully");
            redirect("/admin/courses");
        }
        if (error) {
            console.log(error);
            toast.error("Failed to update course");
        }
    }, [isLoading, isSuccess, error]);

    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        demoUrl: ""
    });


    const [benefits, setBenefits] = useState([{ title: "" }]);
    const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
    const [courseContentData, setCourseContentData] = useState([
        {
            videoUrl: "",
            title: "",
            description: "",
            videoSection: "Untitled Section",
            links: [
                {
                    title: "",
                    url: "",
                },
            ],
            suggestion: "",
        },
    ]);



    const [courseData, setCourseData] = useState({});

    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (editCourseData) {
            setCourseInfo({
                name: editCourseData.name,
                description: editCourseData?.description,
                price: editCourseData.price,
                estimatedPrice: editCourseData?.estimatedPrice,
                tags: editCourseData.tags,
                level: editCourseData.level,
                demoUrl: editCourseData.demoUrl,
                thumbnail: {
                    public_id: editCourseData.thumbnail.public_id,
                    url: editCourseData.thumbnail.url
                },
            })
            setBenefits(editCourseData.benefits);
            setPrerequisites(editCourseData.prerequisites);
            setCourseContentData(editCourseData.courseData);
        }
    }, [editCourseData]);

    const handleSubmit = async () => {
        const formattedBenefits = benefits.map((benefit) => ({ title: benefit.title }));
        const formattedPrerequisites = prerequisites.map((prerequisite) => ({ title: prerequisite.title }));

        const formattedCourseContentData = courseContentData.map((courseContent) => ({
            videoUrl: courseContent.videoUrl,
            title: courseContent.title,
            description: courseContent.description,
            videoSection: courseContent.videoSection,
            links: courseContent.links.map((link) => ({
                title: link.title,
                url: link.url,
            })),
            suggestion: courseContent.suggestion,
        }));

        const finalData = { // Changed name to avoid conflict with the 'data' from useQuery
            name: courseInfo.name,
            description: courseInfo.description,
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            tags: courseInfo.tags,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            totalVideos: courseContentData.length,
            benefits: formattedBenefits,
            prerequisites: formattedPrerequisites,
            // FIX: Change 'courseContent' to 'courseData' to match your DB schema
            courseData: formattedCourseContentData,
        };

        setCourseData(finalData);
    };

    const handleCourseCreate = async (e) => {
        // FIX: Send 'courseData' (the state) instead of 'data' (the query result)
        const res = await editCourse({ id: id, data: courseData });
        console.log("Response after update:", res);
    };

    return (
        <div className="w-full flex min-h-screen">
            <div className="w-[80%]">
                {
                    active === 0 && (
                        <CourseInformation
                            thumbnail={editCourseData?.thumbnail.url || null}
                            imageFile={imageFile}
                            setImageFile={setImageFile}
                            courseInfo={courseInfo}
                            setCourseInfo={setCourseInfo}
                            active={active}
                            setActive={setActive}
                        />
                    )
                }
                {
                    active === 1 && (
                        <CourseData
                            benefits={benefits}
                            setBenefits={setBenefits}
                            prerequisites={prerequisites}
                            setPrerequisites={setPrerequisites}
                            active={active}
                            setActive={setActive}
                        />
                    )
                }
                {
                    active === 2 && (
                        <CourseContent
                            active={active}
                            setActive={setActive}
                            courseContentData={courseContentData}
                            setCourseContentData={setCourseContentData}
                            handleSubmit={handleSubmit}
                        />
                    )
                }
                {
                    active === 3 && (
                        <CoursePreview
                            active={active}
                            setActive={setActive}
                            courseData={courseData}
                            handleCourseCreate={handleCourseCreate}
                            isEdit={true}
                        />
                    )
                }
            </div>
            <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
                <CourseOptions active={active} setActive={setActive} />
            </div>
        </div>
    )
}
