"use client";
import { styles } from '@/app/styles/style';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-hot-toast';
import { RiAddCircleLine } from 'react-icons/ri';

type Props = {
    benefits: { title: string }[];
    setBenefits: Dispatch<SetStateAction<{ title: string }[]>>;
    prerequisites: { title: string }[];
    setPrerequisites: Dispatch<SetStateAction<{ title: string }[]>>;
    active: number;
    setActive: (active: number) => void;
}

export default function CourseData({
    benefits,
    setBenefits,
    prerequisites,
    setPrerequisites,
    active,
    setActive
}: Props) {

    const handleBenefitChange = (index: number, value: string) => {
        setBenefits((prevBenefits) => {
            const updatedBenefits = [...prevBenefits];
            updatedBenefits[index] = { ...updatedBenefits[index], title: value };
            return updatedBenefits;
        });
    };

    const handlePrerequisiteChange = (index: number, value: string) => {
        setPrerequisites((prevPrerequisites) => {
            const updatedPrerequisites = [...prevPrerequisites];
            updatedPrerequisites[index] = { ...updatedPrerequisites[index], title: value };
            return updatedPrerequisites;
        });
    };

    const handleAddBenefit = () => {
        setBenefits([...benefits, { title: "" }]);
    }

    const handleAddPrerequisite = () => {
        setPrerequisites([...prerequisites, { title: "" }]);
    }

    const prevButton = () => {
        setActive(active - 1);
    };

    const handleOptions = () => {
        if (benefits[benefits.length - 1]?.title !== "" && prerequisites[prerequisites.length - 1]?.title !== "") {
            setActive(active + 1);
        } else {
            toast.error("Please fill the fields to go to the next step!");
        }
    };

    return (
        <div className='w-[80%] m-auto mt-24 block'>
            <div>
                <label className={`${styles.label}`}>
                    What are the benefits for students in the course?
                </label>
                <br />
                {benefits.map((benefit, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder="You will be able to build a fullstack project"
                        required
                        value={benefit.title}
                        className={`${styles.input} my-2`}
                        onChange={(e) => handleBenefitChange(index, e.target.value)}
                    />
                ))}
                <RiAddCircleLine
                    onClick={handleAddBenefit}
                    className="h-6 w-6 mt-2 mb-5 text-black dark:text-white cursor-pointer"
                />
            </div>

            <div>
                <label className={`${styles.label}`}>
                    What are the prerequisites for students in the course?
                </label>
                <br />
                {prerequisites.map((prerequisite, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder="You need basic knowledge of React"
                        required
                        value={prerequisite.title}
                        className={`${styles.input} my-2`}
                        onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
                    />
                ))}
                <RiAddCircleLine
                    onClick={handleAddPrerequisite}
                    className="h-6 w-6 mt-2 mb-5 text-black dark:text-white cursor-pointer"
                />
            </div>

            <div className="w-full flex items-center justify-between">
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={prevButton}
                >
                    Prev
                </div>
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={handleOptions}
                >
                    Next
                </div>
            </div>
        </div>
    )
}