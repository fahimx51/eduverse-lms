import Ratings from '@/app/utils/Ratings';
import Image from 'next/image';
import React from 'react'

type Props = {
    item: any
}

export default function ReviewCard({ item }: Props) {
    return (
        <div className="w-full h-[200px] pb-4 dark:bg-slate-500/20 border border-[#00000028] dark:border-[#ffffff1d] backdrop-blur shadow-[bg-slate-700] rounded-lg p-4 shadow-inner flex flex-col">
            <div className="flex w-full items-start">
                <Image
                    src={item.avatar}
                    alt={item.name}
                    height={50}
                    width={50}
                    className="w-[50px] h-[50px] rounded-full object-cover border-2 border-[#37a39a]"
                />
                <div className="flex flex-col md:flex-row justify-between w-full ml-3">
                    <div className="flex flex-col">
                        <h5 className="text-[18px] font-semibold text-black dark:text-white leading-tight">
                            {item.name}
                        </h5>
                        <h6 className="text-[14px] text-slate-600 dark:text-[#ffffffab]">
                            {item.profession}
                        </h6>
                    </div>
                    <div className="mt-1 md:mt-0">
                        <Ratings rating={item.rating} />
                    </div>
                </div>
            </div>

            {/* line-clamp-6 ensures that very long text is truncated so cards stay aligned */}
            <p className="pt-4 font-poppins text-[15px] leading-relaxed text-slate-800 dark:text-white/90 line-clamp-6">
                "{item.comment}"
            </p>
        </div>
    )
}
