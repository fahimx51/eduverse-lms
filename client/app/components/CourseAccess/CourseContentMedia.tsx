"use client"
import { styles } from '@/app/styles/style';
import { User } from '@/app/types/UserType';
import CoursePlayer from '@/app/utils/CoursePlayer';
import { useAddNewQuestionMutation, useAddAnswerMutation } from '@/redux/features/courses/coursesApi';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar } from 'react-icons/ai';
import { BiMessage } from 'react-icons/bi';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { format } from 'timeago.js';

type Props = {
    data: any;
    id: string;
    activeVideo: number;
    setActiveVideo: (activeVideo: number) => void;
    user: User;
    refetch: any;
}

export default function CourseContentMedia({ data, id, activeVideo, setActiveVideo, user, refetch }: Props) {

    const [activeBar, setActiveBar] = useState(0);
    const [rating, setRating] = useState(0);
    const [question, setQuestion] = useState("");
    const [review, setReview] = useState("");

    // 👉 FIX: Use the exact hook name matching your api endpoint configuration
    const [addAnswer, { isSuccess: answerSuccess, error: answerError, isLoading: answerCreationLoading }] = useAddAnswerMutation();
    const [addNewQuestion, { isSuccess, error, isLoading: questionCreationLoading }] = useAddNewQuestionMutation();

    const isReviewExists = data?.[activeVideo]?.reviews?.some((item: any) => item.user?._id === user._id);

    // 👉 FIX: Dynamic answer string acceptance from child inputs
    const handleAnswerSubmit = (answerText: string, qId: string) => {
        if (answerText.trim().length === 0) {
            toast.error("Answer cannot be empty");
            return;
        }
        addAnswer({
            answer: answerText,
            courseId: id,
            contentId: data[activeVideo]._id,
            questionId: qId
        });
    }

    const handleQuestion = () => {
        if (question.length === 0) {
            toast.error("Question can't be empty");
        }
        else {
            addNewQuestion({ question, courseId: id, contentId: data?.[activeVideo]._id })
        }
    }

    useEffect(() => {
        if (isSuccess) {
            setQuestion("");
            refetch();
            toast.success("Successfully Added Question");
        }
        if (answerSuccess) {
            toast.success("Answer added Successfully");
            refetch(); // 👉 FIX: Added refetch hook trigger here to sync view instantly without refreshing
        }
        if (answerError) {
            if ("data" in answerError) {
                const errorMessage = answerError as any;
                toast.error(errorMessage.data.message);
            }
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [isSuccess, error, answerSuccess, answerError]);

    return (
        <div className="w-[95%] 800px:w-[86%] py-4 m-auto min-h-screen mb-10">
            <CoursePlayer
                title={data[activeVideo]?.title}
                videoUrl={data[activeVideo]?.videoUrl}
            />
            <div className="w-full flex items-center justify-between my-3">
                <div
                    className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
                        }`}
                    onClick={() =>
                        setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
                    }
                >
                    <AiOutlineArrowLeft className="mr-2" />
                    Prev Lesson
                </div>
                <div
                    className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
                        }`}
                    onClick={() =>
                        setActiveVideo(
                            data && data.length - 1 === activeVideo
                                ? activeVideo
                                : activeVideo + 1
                        )
                    }
                >
                    Next Lesson
                    <AiOutlineArrowRight className="ml-2" />
                </div>
            </div>

            <h1 className="pt-2 text-[25px] text-black dark:text-white font-[60px]">{data[activeVideo]?.title}</h1>
            <br />
            <div className="w-full p-4 flex items-center justify-between bg-slate-500/20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
                {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
                    <h5
                        key={index}
                        className={`800px:text-[20px] cursor-pointer ${activeBar === index ? "text-red-500" : "text-black dark:text-white"
                            }`}
                        onClick={() => setActiveBar(index)}
                    >
                        {text}
                    </h5>
                ))}
            </div>
            <br />
            {activeBar === 0 && (
                <p className="text-[18px] whitespace-pre-line mb-3 dark:text-white text-black">
                    {data[activeVideo]?.description}
                </p>
            )}

            {activeBar === 1 && (
                <div>
                    {data[activeVideo]?.links.map((item: any, index: number) => (
                        <div className="mb-5" key={index}>
                            <h2 className="800px:text-[20px] 800px:inline-block dark:text-white text-black">
                                {item.title && item.title + " :"}
                            </h2>
                            <a
                                className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
                                href={item.url}
                            >
                                {item.url}
                            </a>
                        </div>
                    ))}
                </div>
            )}

            {activeBar === 2 && (
                <>
                    <div className="flex w-full">
                        <Image
                            src={user.avatar ? user.avatar.url : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"}
                            width={50}
                            height={50}
                            alt=""
                            className="rounded-full h-12 w-12"
                        />
                        <textarea
                            name=""
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            id=""
                            cols={40}
                            rows={5}
                            placeholder="Write your question..."
                            className="outline-none bg-transparent ml-3 border text-black dark:text-white border-gray-200 dark:border-gray-200/10 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-poppins"
                        />
                    </div>
                    <div className="w-full flex justify-end">
                        <div
                            className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 ${questionCreationLoading && "cursor-not-allowed"}`}
                            onClick={questionCreationLoading ? () => { } : handleQuestion}
                        >
                            Submit
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="w-full h-[1px] bg-gray-700/30"></div>
                    <div>
                        {/* Question Replies container layer wrapper */}
                        <CommentReply
                            data={data}
                            activeVideo={activeVideo}
                            handleAnswerSubmit={handleAnswerSubmit}
                            user={user}
                            answerSuccess={answerSuccess}
                        />
                    </div>
                </>
            )}

            {activeBar === 3 && (
                <div className="w-full">
                    <>
                        {!isReviewExists && (
                            <div className="flex w-full">
                                <Image
                                    src={
                                        user.avatar
                                            ? user.avatar.url
                                            : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                                    }
                                    width={50}
                                    height={50}
                                    alt=""
                                    className="w-[50px] h-[50px] rounded-full object-cover"
                                />
                                <div className="w-full">
                                    <h5 className="pl-3 text-[20px] dark:text-white text-black">
                                        Give a Rating <span className="text-red-500">*</span>
                                    </h5>
                                    <div className="flex w-full ml-2 pb-3">
                                        {[1, 2, 3, 4, 5].map((i) =>
                                            rating >= i ? (
                                                <AiFillStar
                                                    key={i}
                                                    className="mr-1 cursor-pointer"
                                                    color="rgb(246,186,0)"
                                                    size={25}
                                                    onClick={() => setRating(i)}
                                                />
                                            ) : (
                                                <AiOutlineStar
                                                    key={i}
                                                    className="mr-1 cursor-pointer"
                                                    color="rgb(246,186,0)"
                                                    size={25}
                                                    onClick={() => setRating(i)}
                                                />
                                            )
                                        )}
                                    </div>
                                    <textarea
                                        name=""
                                        value={review}
                                        onChange={(e) => setReview(e.target.value)}
                                        id=""
                                        cols={40}
                                        rows={5}
                                        placeholder="Write your comment..."
                                        className="outline-none bg-transparent 800px:ml-3 border border-[#ffffff57] w-[95%] 800px:w-full p-2 rounded text-[18px] dark:text-white text-black font-poppins"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="w-full flex justify-end">
                            <div
                                className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2`}
                            >
                                Submit
                            </div>
                        </div>
                    </>
                </div>
            )}
        </div>
    )
};

const CommentReply = ({
    data,
    activeVideo,
    handleAnswerSubmit,
    user,
    answerSuccess
}: any) => {
    return (
        <div className="w-full my-3">
            {
                data[activeVideo]?.questions?.map((item: any, index: number) => (
                    <CommentItem
                        key={index}
                        item={item}
                        handleAnswerSubmit={handleAnswerSubmit}
                        answerSuccess={answerSuccess}
                    />
                ))
            }
        </div>
    )
}

const CommentItem = ({
    item,
    handleAnswerSubmit,
    answerSuccess
}: any) => {
    const [replyActive, setReplyActive] = useState(false);
    // 👉 FIX: Moved the input answer variable down into the component scope to isolate text inputs
    const [localAnswer, setLocalAnswer] = useState("");

    // 👉 FIX: Reset local text area when database response reports successful creation block
    useEffect(() => {
        if (answerSuccess) {
            setLocalAnswer("");
        }
    }, [answerSuccess]);

    return (
        <div className="my-4">
            <div className="flex mb-2">
                <div className="w-[50px] h-[50px]">
                    <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                        <h1 className="uppercase text-[18px] text-black dark:text-white">
                            {item?.user?.name ? item.user.name.slice(0, 2) : "UN"}
                        </h1>
                    </div>
                </div>
                <div className="pl-3">
                    <h5 className="text-[20px] text-black  dark:text-white">{item?.user?.name}</h5>
                    <p className="text-black dark:text-gray-300">{item?.question}</p>
                    <small className="dark:text-[#ffffff83] text-slate-500 ">{format(item?.createdAt)} • </small>
                </div>
            </div>

            <div className="w-full flex">
                <span
                    className="800px:pl-16 text-black dark:text-[#ffffff83] cursor-pointer mr-2"
                    onClick={() => setReplyActive(!replyActive)}
                >
                    {!replyActive ? item?.questionReplies?.length !== 0 ? "All Replies" : "Add Reply" : "Hide Replies"}
                </span>
                <BiMessage size={20} className="cursor-pointer text-slate-600 dark:text-gray-300" />
                <span className="pl-1 mt-[-4px] cursor-pointer text-slate-600 dark:text-gray-300">
                    {item?.questionReplies?.length || 0}
                </span>
            </div>

            {
                replyActive && (
                    <>
                        {item?.questionReplies?.map((reply: any, index: number) => (
                            <div key={index} className="w-full flex 800px:ml-16 my-5 text-black dark:text-white">
                                <div>
                                    <Image
                                        src={
                                            reply?.user?.avatar
                                                ? reply.user.avatar.url
                                                : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                                        }
                                        width={50}
                                        height={50}
                                        alt=""
                                        className="w-[50px] h-[50px] rounded-full object-cover"
                                    />
                                </div>
                                <div className="pl-2">
                                    <div className="flex item-center gap-2">
                                        <h5 className="text-[18px] text-black dark:text-white">{reply?.user?.name}</h5>
                                        <VscVerifiedFilled size={20} className="text-blue-400 mt-[4px]" />
                                    </div>
                                    <p className="text-black dark:text-white">{reply?.answer}</p>
                                    <small className="text-[#ffffff83]">
                                        {format(reply?.createdAt)} •
                                    </small>
                                </div>
                            </div>
                        ))}
                        <div className="w-full flex relative">
                            <textarea
                                rows={5}
                                cols={5}
                                placeholder="Enter your reply..."
                                value={localAnswer}
                                onChange={(e: any) => setLocalAnswer(e.target.value)}
                                className="block 800px:ml-12 mt-2 outline-none bg-transparent text-black dark:text-white border border-[#00000027] dark:border-[#fff] p-[5px] w-[95%] rounded-sm"
                            />
                            <button
                                type="submit"
                                className={`absolute right-0 bottom-1 bg-blue-500 px-3 py-2 cursor-pointer text-white rounded-lg m-2 ${localAnswer === "" && "bg-blue-500/30 dark:text-gray-400 text-gray-600"}`}
                                onClick={() => handleAnswerSubmit(localAnswer, item._id)}
                                disabled={localAnswer === ""}
                            >
                                Reply
                            </button>
                        </div>
                        <br />
                    </>
                )
            }
        </div>
    )
}