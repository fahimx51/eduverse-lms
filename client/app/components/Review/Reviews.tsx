import { styles } from '@/app/styles/style';
import Image from 'next/image';
import React from 'react'
import ReviewCard from './ReviewCard';

export default function Reviews() {

    const reviews = [
        {
            "name": "James Anderson",
            "avatar": "https://randomuser.me/api/portraits/men/32.jpg",
            "profession": "Full Stack Developer | Canada",
            "rating": 5,
            "comment": "This course exceeded my expectations! The practical projects were exactly what I needed to bridge the gap between theory and real-world application. I've taken several LMS courses before, but the curriculum structure here on Eduverse is by far the most logical and industry-aligned I've encountered. Highly recommended for anyone serious about dev."
        },
        {
            "name": "Sarah Chen",
            "avatar": "https://randomuser.me/api/portraits/women/44.jpg",
            "profession": "UI/UX Designer | Singapore",
            "rating": 4.5,
            "comment": "I loved the focus on design principles. The instructor explains complex concepts in a way that is very easy to digest for beginners. The only reason I'm giving 4 stars instead of 5 is that I wanted even more Figma templates, but the overall experience on the Eduverse platform was smooth and very professional."
        },
        {
            "name": "Mina Davidson",
            "avatar": "https://randomuser.me/api/portraits/women/2.jpg",
            "profession": "Junior Web Developer | Indonesia",
            "rating": 5,
            "comment": "Eduverse has completely changed how I approach learning. The community forums are so active and helpful! I was stuck on a React hook for two days, and the mentor responded within hours. It's rare to find an LMS that feels this personal and supportive."
        },
        {
            "name": "Lucas Rossi",
            "avatar": "https://randomuser.me/api/portraits/men/67.jpg",
            "profession": "Software Engineer | Italy",
            "rating": 4.5,
            "comment": "The best investment I've made for my career this year. The community support and the quality of the videos are top-notch. What sets Eduverse apart is the quality of the hands-on labs. You aren't just watching videos; you're building production-ready code that you can actually show off in your portfolio. My coding confidence has tripled since I started this track."
        },
        {
            "name": "Amara Okafor",
            "avatar": "https://randomuser.me/api/portraits/women/12.jpg",
            "profession": "Data Scientist | Nigeria",
            "rating": 5,
            "comment": "The step-by-step approach made learning Python so much less intimidating. I appreciate how Eduverse breaks down data sets into manageable chunks. The mobile app interface is also great for learning while commuting. Fantastic content!"
        },
        {
            "name": "Fahim Ahmed",
            "avatar": "https://randomuser.me/api/portraits/men/85.jpg",
            "profession": "MERN Stack Developer | Bangladesh",
            "rating": 5,
            "comment": "As a junior engineer focusing on the MERN stack, I found the Next.js and TypeScript modules on Eduverse to be absolute game-changers. The deep dive into JWT authentication and Redis caching provided exactly the kind of professional-grade knowledge I needed for my portfolio projects. The balance between theory and high-level system design is perfect."
        }
    ]

    return (
        <div className="w-[90%] 800px:w-[85%] m-auto">
            <div className="w-full 800px:flex items-center">
                <div className="800px:w-[50%] w-full">
                    <Image
                        src="/review-image.png"
                        alt="business"
                        width={700}
                        height={700}
                    />
                </div>
                <div className="800px:w-[50%] w-full">
                    <h3 className={`${styles.title} 800px:!text-[40px]`}>
                        Our Students Are{" "}
                        <span className="bg-gradient-to-r from-[#37a39a] to-[#05c1ff] bg-clip-text text-transparent">
                            Our Strength
                        </span>{" "}
                        <br /> See What They Say About Us
                    </h3>
                    <br />
                    <p className={styles.label}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque unde
                        voluptatum dignissimos, nulla perferendis dolorem voluptate nemo
                        possimus magni deleniti natus accusamus officiis quasi nihil
                        commodi, praesentium quidem, quis doloribus?
                    </p>
                </div>
                <br /> <br />
            </div>
            <div className="columns-1 md:columns-2 lg:columns-2 gap-[25px] xl:gap-[35px] space-y-[25px] mb-12 border-0">
                {reviews && reviews.map((item, index) => (
                    <div key={index} className="break-inside-avoid mb-[25px]">
                        <ReviewCard item={item} />
                    </div>
                ))}
            </div>
        </div>
    )
}
