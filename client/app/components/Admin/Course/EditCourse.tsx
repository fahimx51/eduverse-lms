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

export default function EditCourse() {
    const { id } = useParams();

    // 1. Get All Courses and Mutation
    const { data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
    const [editCourse, { isSuccess, error, isLoading }] = useEditCourseMutation();

    const [active, setActive] = useState(0);

    // 2. Find the specific course from the list
    const editCourseData = data && data.courses.find((i: any) => i._id === id);

    // 3. Main States
    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        categories: "", // Added this
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
            videoLength: 0, // Added this
            links: [{ title: "", url: "" }],
            suggestion: "",
        },
    ]);

    const [courseData, setCourseData] = useState({});
    const [imageFile, setImageFile] = useState(null);

    // 4. Initialize state when editCourseData is available
    useEffect(() => {
        if (editCourseData) {
            setCourseInfo({
                name: editCourseData.name,
                description: editCourseData?.description,
                price: editCourseData.price,
                estimatedPrice: editCourseData?.estimatedPrice,
                tags: editCourseData.tags,
                level: editCourseData.level,
                categories: editCourseData.categories, // Initialize category
                demoUrl: editCourseData.demoUrl,
            });
            // DEEP COPY to avoid "Read Only" errors
            setBenefits(editCourseData.benefits.map((b: any) => ({ ...b })));
            setPrerequisites(editCourseData.prerequisites.map((p: any) => ({ ...p })));
            setCourseContentData(editCourseData.courseData.map((c: any) => ({
                ...c,
                links: c.links.map((l: any) => ({ ...l }))
            })));
        }
    }, [editCourseData]);

    // 5. Handle Mutation Status
    useEffect(() => {
        if (isSuccess) {
            toast.success("Course updated successfully");
            redirect("/admin/courses");
        }
        if (error) {
            const errorData = error as any;
            toast.error(errorData?.data?.message || "Failed to update course");
        }
    }, [isSuccess, error]);

    // 6. Format and Prepare Data
    const handleSubmit = async () => {
        const formattedBenefits = benefits.map((benefit) => ({ title: benefit.title }));
        const formattedPrerequisites = prerequisites.map((prerequisite) => ({ title: prerequisite.title }));

        const formattedCourseContentData = courseContentData.map((courseContent) => ({
            // ... your existing content mapping
            videoUrl: courseContent.videoUrl,
            title: courseContent.title,
            description: courseContent.description,
            videoSection: courseContent.videoSection,
            videoLength: Number(courseContent.videoLength),
            links: courseContent.links.map((link) => ({
                title: link.title,
                url: link.url,
            })),
            suggestion: courseContent.suggestion,
        }));

        const finalData = {
            name: courseInfo.name,
            description: courseInfo.description,
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            tags: courseInfo.tags,
            level: courseInfo.level,
            categories: courseInfo.categories,
            demoUrl: courseInfo.demoUrl, // <--- ADD THIS LINE MANUALLY HERE
            totalVideos: courseContentData.length,
            benefits: formattedBenefits,
            prerequisites: formattedPrerequisites,
            courseData: formattedCourseContentData,
        };

        setCourseData(finalData);
    };

    // 7. Execute Update
    const handleCourseCreate = async () => {
        const dataPayload = courseData;
        await editCourse({ id: id, data: dataPayload });
    };

    return (
        <div className="w-full flex min-h-screen">
            <div className="w-[80%]">
                {active === 0 && (
                    <CourseInformation
                        thumbnail={editCourseData?.thumbnail.url || null}
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        courseInfo={courseInfo}
                        setCourseInfo={setCourseInfo}
                        active={active}
                        setActive={setActive}
                    />
                )}
                {active === 1 && (
                    <CourseData
                        benefits={benefits}
                        setBenefits={setBenefits}
                        prerequisites={prerequisites}
                        setPrerequisites={setPrerequisites}
                        active={active}
                        setActive={setActive}
                    />
                )}
                {active === 2 && (
                    <CourseContent
                        active={active}
                        setActive={setActive}
                        courseContentData={courseContentData}
                        setCourseContentData={setCourseContentData}
                        handleSubmit={handleSubmit}
                    />
                )}
                {active === 3 && (
                    <CoursePreview
                        active={active}
                        setActive={setActive}
                        courseData={courseData}
                        handleCourseCreate={handleCourseCreate}
                        isEdit={true}
                    />
                )}
            </div>
            <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
                <CourseOptions active={active} setActive={setActive} />
            </div>
        </div>
    )
}