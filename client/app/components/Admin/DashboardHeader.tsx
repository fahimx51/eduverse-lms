"use client";

import { useEffect, useState } from "react";
import ThemeSwitcher from "@/app/utils/ThemeSwitcher";
import { RootState } from "@/redux/store/store";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import socketIO from "socket.io-client"
import { useGetAllNotificationsQuery, useUpdateNotificationStatusMutation } from "@/redux/features/notifications/notificationApi";
import { format } from 'timeago.js';

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI;
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function DashboardHeader({ open, setOpen }: Props) {

    const { data, refetch } = useGetAllNotificationsQuery(undefined, { refetchOnMountOrArgChange: true });
    const [updateNotificationStatus, { isSuccess }] = useUpdateNotificationStatusMutation();

    const [notifications, setNotifications] = useState([]);
    const [audio] = useState(
        new Audio(
            "https://res.cloudinary.com/dxzkcuoe6/video/upload/v1779117112/notif_llxjqt.wav"
        )
    );

    const playerNotificationSound = () => {
        audio.play();
    }

    useEffect(() => {
        if (data) {
            setNotifications(data.notifications.filter((item: any) => item.status === "unread"));
        };
        if (isSuccess) {
            refetch();
        }
        audio.load();
    }, [data, isSuccess]);


    useEffect(() => {
        socketId.on("newNotification", (data) => {
            refetch();
            playerNotificationSound();
        });
    }, []);

    const handleNotificationStatusChange = async (id: string) => {
        await updateNotificationStatus(id);
    }

    return (
        <div className="w-full flex items-center justify-end p-4 fixed top-0 right-0 z-10 shadow-sm dark:shadow-md dark:bg-slate-900/60 dark:backdrop:blur-lg ">
            <ThemeSwitcher />
            <div
                className="relative cursor-pointer m-2"
                onClick={() => setOpen(!open)}
            >
                <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
                <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
                    {notifications && notifications.length}
                </span>
            </div>

            {open && (
                <div className="w-[350px] h-[50vh] dark:bg-[#111C43] bg-slate-100 shadow-xl absolute top-16 z-10 rounded">
                    <h5 className="text-center text-[18px] font-Poppins text-black font-bold dark:text-white p-3">
                        Notifications
                    </h5>

                    {/* Notification Item */}
                    <div className="h-full overflow-y-auto">
                        {notifications && notifications.map((item: any, index: number) => (
                            <div key={index} className="dark:bg-[#1a2432] bg-gray-50 border-b dark:border-b-slate-800 border-b-gray-200 hover:bg-gray-100 dark:hover:bg-[#222f42] transition-colors p-4">
                                <div className="w-full flex items-center justify-between mb-1">
                                    <p className="text-sm font-semibold text-black dark:text-white">
                                        {item.title}
                                    </p>
                                    <p className="text-xs font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer transition-colors"
                                        onClick={() => handleNotificationStatusChange(item._id)}>
                                        Mark as read
                                    </p>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                    {item.message}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500">
                                    {format(item.createdAt)}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            )}
        </div>
    );
};