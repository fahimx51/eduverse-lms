'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react'

type Props = {
    videoUrl: string;
    title: string;
}

export default function CoursePlayer({ videoUrl, title }: Props) {
    const [videoData, setVideoData] = useState({
        otp: "",
        playbackInfo: ""
    });

    useEffect(() => {
        // Only fetch OTP if videoUrl exists and is not empty
        if (!videoUrl) return;

        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}course/getVdoCipherOTP`, {
            videoId: videoUrl
        })
            .then((res) => {
                setVideoData({
                    otp: res.data.otp,
                    playbackInfo: res.data.playbackInfo
                });
            })
            .catch((error) => {
                console.error("VdoCipher OTP Fetch Error:", error.response?.data?.message || error.message);
            });
    }, [videoUrl]);

    return (
        <div className="relative pt-[56.25%] overflow-hidden">
            {videoData.otp && videoData.playbackInfo ? (
                <iframe
                    src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=KAXYG2HWP9VrccTi`}
                    className="absolute top-0 left-0 w-full h-full border-none"
                    allowFullScreen={true}
                    allow="encrypted-media"
                    title={title}
                />
            ) : (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/10 dark:bg-white/10 text-sm">
                    {videoUrl ? "Loading video player..." : "No video available"}
                </div>
            )}
        </div>
    )
}