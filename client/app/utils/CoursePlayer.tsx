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
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}course/getVdoCipherOTP`, {
            videoId: videoUrl
        }).then((res) => {
            setVideoData(res.data);
        })
    }, [videoUrl]);

    return (
        <div className="relative pt-[41%]">
            {videoData.otp && videoData.playbackInfo !== "" && (
                <iframe
                    src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=KAXYG2HWP9VrccTi`}
                    className="absolute top-0 left-0 w-[90%] h-full border-none"
                    allowFullScreen={true}
                    allow="encrypted-media"
                >

                </iframe>
            )}
        </div>
    )
}
