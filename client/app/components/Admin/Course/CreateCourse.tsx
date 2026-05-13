'use client'

import React, { useEffect, useState } from 'react'
import CourseInformation from './CourseInformation';
import CourseOptions from './CourseOptions';
import CourseData from './CourseData';
import CourseContent from './CourseContent';
import CoursePreview from './CoursePreview';
import { useCreateCourseMutation } from '@/redux/features/courses/coursesApi';
import { toast } from 'react-hot-toast';
import { redirect } from 'next/navigation';

export default function CreateCourse() {

    const [createCourse, { isLoading, isSuccess, error }] = useCreateCourseMutation();
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Course created successfully");
            redirect("/admin/courses");
        }
        if (error) {
            console.log(error);
            toast.error("Failed to create course");
        }
    }, [isLoading, isSuccess, error]);

    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        categories: "",
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
            videoLength: "",
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

    const handleSubmit = async () => {
        // Format benefits array
        const formattedBenefits = benefits.map((benefit) => ({ title: benefit.title }));
        // Format prerequisites array
        const formattedPrerequisites = prerequisites.map((prerequisite) => ({ title: prerequisite.title }));

        // Format course content array
        const formattedCourseContentData = courseContentData.map((courseContent) => ({
            videoUrl: courseContent.videoUrl,
            title: courseContent.title,
            description: courseContent.description,
            videoSection: courseContent.videoSection,
            // FIX: Explicitly include videoLength and convert to Number
            videoLength: courseContent.videoLength !== "" ? Number(courseContent.videoLength) : 0,
            links: courseContent.links.map((link) => ({
                title: link.title,
                url: link.url,
            })),
            suggestion: courseContent.suggestion,
        }));

        // Prepare our data object
        const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            tags: courseInfo.tags,
            level: courseInfo.level,
            // FIX: Ensure category is passed if your schema expects it
            categories: courseInfo.categories,
            demoUrl: courseInfo.demoUrl,
            totalVideos: courseContentData.length,
            benefits: formattedBenefits,
            prerequisites: formattedPrerequisites,
            courseData: formattedCourseContentData,
        };

        setCourseData(data);
    };

    // console.log("Data : ", courseData);
    // console.log("info ", courseInfo);

    const handleCourseCreate = async (e) => {
        const data = courseData;
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        formData.append("thumbnail", imageFile);

        if (!isLoading) {
            await createCourse(formData);
        }
    };

    return (
        <div className="w-full flex min-h-screen">
            <div className="w-[80%]">
                {
                    active === 0 && (
                        <CourseInformation
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
