import CoursePlayer from '@/app/utils/CoursePlayer';
import React from 'react'

type Props = {
    active: number,
    setActive: (active: number) => void;
    courseData: any;
    handleCourseCreate: any;
}

export default function CoursePreview({ active, setActive, courseData, handleCourseCreate }: Props) {

    const dicountPercentenge =
        ((courseData?.estimatedPrice - courseData?.price) /
            courseData?.estimatedPrice) *
        100;

    const discountPercentengePrice = dicountPercentenge.toFixed(0);

    return (
        <div className="w-[90%] m-auto py-5 mb-5">
            <div className="w-full relative">
                <div className="w-full mt-10">
                    <CoursePlayer
                        videoUrl={courseData?.demoUrl}
                        title={courseData?.title}
                    />
                </div>

                <div className="flex items-center">
                    <h1 className="pt-5 text-[25px]">
                        {courseData?.price === 0 ? "Free" : courseData?.price + "$"}
                    </h1>

                    <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
                        {courseData?.estimatedPrice}$
                    </h5>

                    <h4 className="pl-5 pt-4 text-[22px]">
                        {discountPercentengePrice}% Off
                    </h4>
                </div>

            </div>
        </div>
    )
}
