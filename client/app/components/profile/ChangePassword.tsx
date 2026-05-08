import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import React, { FC, useState } from "react";
import { toast } from "react-hot-toast";

const ChangePassword: FC = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

    const passwordChangeHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            return toast.error("Passwords do not match!");
        }

        if (newPassword.length < 6) {
            return toast.error("Password must be at least 6 characters");
        }

        try {
            await updatePassword({ oldPassword, newPassword }).unwrap();
            toast.success("Password changed successfully!");
            // Reset form
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            const errorData = err as { data?: { message?: string } };
            toast.error(errorData?.data?.message || "Failed to update password");
            // console.log(err);
        }
    };

    return (
        <div className="w-full pl-6 md:pl-10">
            <h1 className="block text-[25px] 800px:text-[30px] font-poppins font- text-black dark:text-white pb-2 text-center">
                Change Password
            </h1>
            <div className="w-full flex justify-center">
                <form
                    onSubmit={passwordChangeHandler}
                    className="flex flex-col items-center w-full md:w-[80%] lg:w-[60%]"
                >
                    {/* Old Password */}
                    <div className="w-full mt-5">
                        <label className="block pb-2 text-black dark:text-white font-poppins">
                            Enter your old password
                        </label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 dark:border-gray-700 bg-transparent rounded-md p-2 text-black dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-[#37a39a]"
                            required
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>

                    {/* New Password */}
                    <div className="w-full mt-5">
                        <label className="block pb-2 text-black dark:text-white font-poppins">
                            Enter your new password
                        </label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 dark:border-gray-700 bg-transparent rounded-md p-2 text-black dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-[#37a39a]"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="w-full mt-5">
                        <label className="block pb-2 text-black dark:text-white font-poppins">
                            Confirm your new password
                        </label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 dark:border-gray-700 bg-transparent rounded-md p-2 text-black dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-[#37a39a]"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <input
                        className={`w-full md:w-[250px] h-[40px] border border-blue-600 dark:border-[#37a39a] text-blue-600 dark:text-[#37a39a] font-semibold rounded-[5px] mt-8 cursor-pointer hover:bg-blue-600 dark:hover:bg-[#37a39a] hover:text-white transition-all duration-300 mx-auto block ${isLoading && "opacity-50 cursor-not-allowed"
                            }`}
                        required
                        value="Update Password"
                        type="submit"
                        disabled={isLoading}
                    />
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;