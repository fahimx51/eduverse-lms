import Ratings from '@/app/utils/Ratings';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { AiOutlineUnorderedList } from 'react-icons/ai';

type Props = {
    item: any;
    isProfile?: boolean
}

export default function CourseCard({ item, isProfile }: Props) {
    return (
        <Link href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}>
            <div className="group w-full min-h-[420px] bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-4 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 dark:hover:bg-slate-800/80">

                {/* Image Container with Zoom Effect */}
                <div className="relative w-full h-48 overflow-hidden rounded-xl">
                    <Image
                        src={item.thumbnail.url}
                        alt="Course Thumbnail"
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Floating Badge (Optional) */}
                    <div className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-md">
                        {item.level || "Bestseller"}
                    </div>
                </div>

                <div className="mt-4">
                    <h1 className="font-poppins font-semibold text-[17px] leading-tight text-slate-800 dark:text-white line-clamp-2 h-12">
                        {item.name}
                    </h1>

                    <div className="w-full flex items-center justify-between py-3 border-b border-gray-100 dark:border-white/5">
                        <Ratings rating={item.rating} />
                        <span className={`text-[13px] font-medium text-slate-500 dark:text-slate-400 ${isProfile && "hidden 800px:inline"}`}>
                            {item.purchased.toLocaleString()} Students
                        </span>
                    </div>

                    <div className="w-full flex items-center justify-between pt-4">
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                {item.price === 0 ? "Free" : `$${item.price}`}
                            </h3>
                            {item.estimatedPrice > item.price && (
                                <span className="text-[14px] line-through text-slate-400">
                                    ${item.estimatedPrice}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-white/10 rounded-full">
                            <AiOutlineUnorderedList size={16} className="text-slate-700 dark:text-slate-300" />
                            <h5 className="text-[12px] font-medium text-slate-700 dark:text-slate-300">
                                {item.courseData?.length} Lectures
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
