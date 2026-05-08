import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import { AiOutlineCamera } from "react-icons/ai";
import { User } from "@/app/types/UserType";
import defaultAvatar from "../../../public/avatar.jpeg";
import { useUpdateAvatarMutation, useUpdateNameMutation } from "@/redux/features/user/userApi";
import { toast } from "react-hot-toast";

type Props = {
    user: User;
};

const ProfileInfo: FC<Props> = ({ user }) => {
    const [name, setName] = useState(user.name);
    const [avatar, setAvatar] = useState(user?.avatar?.url || defaultAvatar);
    const [updateAvatar] = useUpdateAvatarMutation();
    const [updateName] = useUpdateNameMutation();

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files) {
            const file = e.target.files[0];

            setAvatar(URL.createObjectURL(file));
            const formData = new FormData();
            formData.append("avatar", file);

            try {
                await updateAvatar(formData).unwrap();
                toast.success("Profile image updated!");
            } catch (error) {
                toast.error("Upload failed");
            }
        }
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (name !== "") {
            try {
                await updateName({
                    name,
                    email: user.email
                }).unwrap();
                toast.success("User info updated successfully");

            } catch (err) {
                toast.error("Failed to update user info!");
                console.error("Update error:", err);
            }
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            {/* Avatar Section */}
            <div className="relative">
                <Image
                    src={avatar}
                    alt={user.name}
                    width={120}
                    height={120}
                    className="w-[120px] h-[120px] cursor-pointer border-[3px] border-blue-600 rounded-full object-cover"
                />
                <input
                    type="file"
                    id="avatar"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/png,image/jpg,image/jpeg,image/webp"
                />
                <label htmlFor="avatar">
                    <div className="w-[30px] h-[30px] dark:bg-slate-900 bg-gray-100 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer border border-gray-600">
                        <AiOutlineCamera size={20} className="text-black dark:text-white" />
                    </div>
                </label>
            </div>

            {/* Form Section */}
            <div className="w-full pl-6 md:pl-10 mt-10">
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <div className="w-full md:w-[80%] lg:w-[60%]">

                        <div className="pb-4">
                            <label className="block pb-2 text-black dark:text-white font-poppins">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 dark:border-gray-700 bg-transparent rounded-md p-2 text-black dark:text-white focus:outline-none focus:border-blue-600"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="pb-4">
                            <label className="block pb-2 text-black dark:text-white font-poppins">
                                Email Address
                            </label>
                            <input
                                type="email"
                                readOnly
                                className="w-full border border-gray-300 dark:border-gray-700 bg-transparent rounded-md p-2 text-gray-500 cursor-not-allowed"
                                value={user.email}
                            />
                        </div>

                        <input
                            type="submit"
                            value="Update"
                            className={`w-full md:w-[250px] h-[40px] border border-blue-600 dark:border-[#37a39a] text-blue-600 dark:text-[#37a39a] font-semibold rounded-[5px] mt-8 cursor-pointer hover:bg-blue-600 dark:hover:bg-[#37a39a] hover:text-white transition-all duration-300 mx-auto block `}
                        />

                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileInfo;