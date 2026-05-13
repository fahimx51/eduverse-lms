"use client"

import { useEditHeroDataMutation, useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react'
import Loader from '../../Loader/Loader';
import { styles } from '@/app/styles/style';
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { toast } from 'react-hot-toast';

export default function EditCategories() {

    const { data } = useGetHeroDataQuery("Categories", {
        refetchOnMountOrArgChange: true
    });

    const [editHeroData, { isSuccess, error, isLoading }] =
        useEditHeroDataMutation();

    const [categories, setCategories] = useState<any>([]);

    useEffect(() => {
        if (data) {
            setCategories(data.layout.categories);
        }
    }, [data]);

    // UPDATE CATEGORY TITLE
    // 1. ADD NEW CATEGORY with a temporary ID
    const handleAddNewCategory = () => {
        // Check if the last category is empty to prevent spamming empty rows
        if (categories.length > 0 && categories[categories.length - 1].title === "") {
            toast.error("Please fill the existing category first!");
        } else {
            setCategories((prevCategory: any) => [
                ...prevCategory,
                {
                    _id: Date.now().toString(), // Temporary ID so the input knows which one to update
                    title: "",
                },
            ]);
        }
    };

    // 2. UPDATE CATEGORY TITLE
    const handleCategoriesAdd = (id: string, value: string) => {
        setCategories((prevCategory: any) =>
            prevCategory.map((item: any) =>
                // Now every item has either a MongoDB ID or a Date.now() ID
                item._id === id
                    ? { ...item, title: value }
                    : item
            )
        );
    };

    // SAVE CATEGORY
    const handleEdit = async () => {

        const cleanCategories = categories
            .filter((item: any) => item.title.trim() !== "") // Remove empty rows
            .map((item: any) => ({
                title: item.title, // Only keep the title property
            }));


        try {
            await editHeroData({
                type: "Categories",
                categories: cleanCategories,
            });

            toast.success("Categories updated successfully!");
        }
        catch (error) {

            toast.error("Something went wrong");
        }

    };

    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div className="mt-[120px] text-center">
                        <h1 className={`${styles.title}`}>
                            All Categories
                        </h1>

                        {categories &&
                            categories.map((item: any, index: number) => {
                                return (
                                    <div className="p-3" key={index}>
                                        <div className="flex items-center w-full justify-center">

                                            <input
                                                className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                                                value={item.title}
                                                onChange={(e) =>
                                                    handleCategoriesAdd(
                                                        item._id,
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter category title..."
                                            />

                                            <AiOutlineDelete
                                                className="dark:text-white text-black text-[18px] cursor-pointer"
                                                onClick={() => {
                                                    setCategories((prevCategory: any) =>
                                                        prevCategory.filter(
                                                            (i: any) => i._id !== item._id
                                                        )
                                                    );
                                                }}
                                            />

                                        </div>
                                    </div>
                                );
                            })}

                        {/* ADD CATEGORY BUTTON */}
                        <div className="flex justify-center mt-4">
                            <AiOutlinePlusCircle
                                className="dark:text-white text-black text-[28px] cursor-pointer"
                                onClick={handleAddNewCategory}
                            />
                        </div>

                        {/* SAVE BUTTON */}
                        <div className="flex justify-center mt-6">
                            <button
                                className={`${styles.button} !w-[200px] !h-[45px]`}
                                onClick={handleEdit}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                )
            }
        </>
    )
}