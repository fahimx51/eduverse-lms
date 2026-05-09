import React from 'react'
import { IoMdCheckmark } from 'react-icons/io';

type Props = {
    active: number;
    setActive: (active: number) => void;
}

export default function CourseOptions({ active, setActive }: Props) {

    const options = [
        "Course Information",
        "Course Options",
        "Course Content",
        "Course Preview",
    ];

    return (
        <div>
            {
                options.map((option, index) => (
                    <div
                        key={index}
                        className={`w-full flex py-5 `}
                    >
                        <div className={`w-[35px] h-[35px] rounded-full flex items-center justify-center ${active + 1 > index ? "bg-blue-500" : "bg-slate-400/60 dark:bg-gray-500"} relative`}>
                            <IoMdCheckmark className={`text-[25px] text-white`} />
                            {
                                index !== options.length - 1 && (
                                    <div className={`absolute h-[30px] w-1 ${active + 1 > index ? "bg-blue-500" : "bg-slate-500"} bottom-[-100%]`}>

                                    </div>
                                )
                            }
                        </div>
                        <h5 className={`pl-3 ${active === index ? "text-black font-bold dark:text-white" : "text-slate-500 dark:text-gray-400"} text-[20px]`} >
                            {option}
                        </h5>
                    </div>
                ))
            }
        </div>
    )
}
