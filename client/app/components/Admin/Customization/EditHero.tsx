'use client'

import { useEditHeroDataMutation, useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast';
import { AiOutlineCamera } from 'react-icons/ai';

export default function EditHero() {
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data } = useGetHeroDataQuery("Banner", {
        refetchOnMountOrArgChange: true
    });
    // console.log(data);

    const [editHeroData, { isSuccess, error }] = useEditHeroDataMutation();

    useEffect(() => {
        if (data) {
            setTitle(data?.layout?.banner?.title);
            setSubTitle(data?.layout?.banner?.subTitle);
            setImage(data?.layout?.banner?.image?.url);
        }
    }, [data]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        // call your update API here
        // console.log({ title, subTitle, imageFile });
        const formData = new FormData();

        // 2. Append text fields
        // Ensure 'type' is exactly "Banner" to pass your backend check
        formData.append("type", "Banner");
        formData.append("title", title);
        formData.append("subTitle", subTitle);

        // 3. Append the image file
        // The key "image" must match what your upload middleware (e.g., Multer) expects
        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            await editHeroData(formData);
            toast.success("Successfully updated hero!");
        }
        catch (error: any) {
            toast.error("failed to update hero section");
        }
    };

    const displayImage = previewUrl || image;

    return (
        <div className="w-full min-h-screen pt-[80px] px-4 800px:px-8 pb-10">

            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-josefin font-bold text-black dark:text-white">
                    Edit Hero Section
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-poppins">
                    Update your homepage banner content
                </p>
            </div>

            <div className="grid 800px:grid-cols-2 gap-8 items-start">

                {/* LEFT — Image Upload */}
                <div className="flex flex-col gap-4">
                    <label className="text-sm font-medium font-poppins text-slate-700 dark:text-slate-300">
                        Banner Image
                    </label>

                    <div className="relative w-full aspect-square max-w-[400px] mx-auto 800px:mx-0">
                        {/* Image Preview */}
                        <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-dashed border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-[#1a2550] flex items-center justify-center">
                            {displayImage ? (
                                <Image
                                    src={displayImage}
                                    alt="Hero banner"
                                    fill
                                    className="object-cover rounded-2xl"
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-3 text-slate-400 dark:text-slate-500">
                                    <AiOutlineCamera size={48} />
                                    <p className="text-sm font-poppins">No image selected</p>
                                </div>
                            )}
                        </div>

                        {/* Camera Button */}
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-3 right-3 w-10 h-10 bg-[#3b5bdb] hover:bg-[#2f4bc4] rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95"
                        >
                            <AiOutlineCamera size={18} className="text-white" />
                        </button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>

                    {previewUrl && (
                        <p className="text-xs text-green-500 font-poppins flex items-center gap-1">
                            ✓ New image selected — save to apply
                        </p>
                    )}
                </div>

                {/* RIGHT — Text Fields */}
                <div className="flex flex-col gap-6">

                    {/* Title */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium font-poppins text-slate-700 dark:text-slate-300">
                            Hero Title
                        </label>
                        <textarea
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            rows={3}
                            placeholder="Enter hero title..."
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-[#1a2550] border border-slate-200 dark:border-white/10 rounded-xl text-black dark:text-white text-sm font-poppins outline-none focus:ring-2 focus:ring-[#3b5bdb] placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none transition-all"
                        />
                        <p className="text-xs text-slate-400 dark:text-slate-600 font-poppins text-right">
                            {title?.length || 0} characters
                        </p>
                    </div>

                    {/* Subtitle */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium font-poppins text-slate-700 dark:text-slate-300">
                            Hero Subtitle
                        </label>
                        <textarea
                            value={subTitle}
                            onChange={(e) => setSubTitle(e.target.value)}
                            rows={4}
                            placeholder="Enter hero subtitle..."
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-[#1a2550] border border-slate-200 dark:border-white/10 rounded-xl text-black dark:text-white text-sm font-poppins outline-none focus:ring-2 focus:ring-[#3b5bdb] placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none transition-all"
                        />
                        <p className="text-xs text-slate-400 dark:text-slate-600 font-poppins text-right">
                            {subTitle?.length || 0} characters
                        </p>
                    </div>

                    {/* Preview Card */}
                    <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111C43] p-4">
                        <p className="text-xs font-medium font-poppins text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
                            Preview
                        </p>
                        <h2 className="text-lg font-bold font-josefin text-black dark:text-white leading-snug mb-2">
                            {title || "Your title will appear here"}
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-poppins leading-relaxed">
                            {subTitle || "Your subtitle will appear here"}
                        </p>
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        className="w-full h-12 bg-[#3b5bdb] hover:bg-[#2f4bc4] active:scale-[0.98] text-white font-poppins font-medium text-sm rounded-xl transition-all shadow-md shadow-blue-900/20"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    )
}