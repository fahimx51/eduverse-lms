import { styles } from '@/app/styles/style';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { BsLink45Deg, BsPencil } from 'react-icons/bs';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseContentData: any,
    setCourseContentData: (courseContentData: any) => void;
    handleSubmit: any;
}

export default function CourseContent({ active, setActive, courseContentData, setCourseContentData, handleSubmit: handleCourseSubmit }: Props) {

    const [isCollapse, setIsCollapse] = useState(
        Array(courseContentData.length).fill(false)
    );
    const [activeSection, setActiveSection] = useState(1);

    const handleSubmit = (e: any) => {
        e.preventDefault();
    }
    const handleCollapseToggle = (index: number) => {
        const updatedCollapse = [...isCollapse];
        updatedCollapse[index] = !updatedCollapse[index];
        setIsCollapse(updatedCollapse);
    }
    const handleRemoveLink = (index: number, linkIndex: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.splice(linkIndex, 1);
        setCourseContentData(updatedData);
    }

    const handleAddLink = (index: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.push({ tittle: "", url: "" });
        setCourseContentData(updatedData);
    }

    const newContentHandler = (item: any) => {
        if (
            item.title === "" ||
            item.description === "" ||
            item.videoUrl === "" ||
            item.links[0].title === "" ||
            item.links[0].url === ""
        ) {
            toast.error("Please fill all the fields first!");
        } else {
            let newVideoSection = "";

            if (courseContentData.length > 0) {
                const lastVideoSection =
                    courseContentData[courseContentData.length - 1].videoSection;

                // use the last videoSection if available, else use user input
                if (lastVideoSection) {
                    newVideoSection = lastVideoSection;
                }
            }

            const newContent = {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: newVideoSection,
                links: [{ title: "", url: "" }],
            };

            setCourseContentData([...courseContentData, newContent]);
        }
    };

    const addNewSection = () => {
        if (
            courseContentData[courseContentData.length - 1].title === "" ||
            courseContentData[courseContentData.length - 1].description === "" ||
            courseContentData[courseContentData.length - 1].videoUrl === "" ||
            courseContentData[courseContentData.length - 1].links[0].title === "" ||
            courseContentData[courseContentData.length - 1].links[0].url === ""
        ) {
            toast.error("Please fill all the fields first!");
        }
        else {
            setActiveSection(activeSection + 1);

            const newContent = {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: `Untitled Section ${activeSection}`,
                links: [{ title: "", url: "" }],
                suggestion: "",
            };

            setCourseContentData([...courseContentData, newContent]);
        }
    };

    const prevButton = () => {
        setActive(active - 1);
    }

    const handleOptions = () => {
        if (
            courseContentData[courseContentData.length - 1].title === "" ||
            courseContentData[courseContentData.length - 1].description === "" ||
            courseContentData[courseContentData.length - 1].videoUrl === "" ||
            courseContentData[courseContentData.length - 1].links[0].title === "" ||
            courseContentData[courseContentData.length - 1].links[0].url === ""
        ) {
            toast.error("section can't be empty!");
        } else {
            setActive(active + 1);
            handleCourseSubmit();
        }
    };

    return (
        <div className="w-[80%] m-auto mt-24 p-3">
            <form onSubmit={handleSubmit}>
                {
                    courseContentData?.map((item, index) => {
                        const showSectionInput = index === 0 || item.videoSection !== courseContentData[index - 1].videoSection;

                        return (
                            <div key={index}>
                                <div className={`w-full bg-[#cdc8c817] p-4 ${showSectionInput ? "mt-10" : "mb-0"}`}>
                                    {
                                        showSectionInput && (
                                            <>
                                                <div className="flex w-full items-center">
                                                    <input
                                                        type="text"
                                                        className={`text-[20px] ${item.videoSection === "Untitled Section"
                                                            ? "w-[170px]"
                                                            : "w-max"
                                                            } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none `}
                                                        value={item.videoSection}
                                                        onChange={(e) => {
                                                            const updatedData = [...courseContentData];
                                                            updatedData[index].videoSection = e.target.value;
                                                            setCourseContentData(updatedData);
                                                        }}
                                                    />
                                                    <BsPencil className="text-black dark:text-white cursor-pointer" />
                                                </div>
                                                <br />
                                            </>
                                        )
                                    }
                                    <div className="flex w-full items-center justify-between my-0">
                                        {
                                            isCollapse[index] ? (
                                                <>
                                                    {
                                                        item.title ? (
                                                            <p className="font-poppins dark:text-white text-black" >{index + 1} . {item.title}</p>
                                                        ) : (
                                                            <>
                                                            </>
                                                        )
                                                    }
                                                </>
                                            ) : (
                                                <div></div>
                                            )
                                        }
                                        {/* arrow button for collapse video content  */}
                                        <div className="flex items-center">
                                            <AiOutlineDelete
                                                className={`dark:text-white text-[20px] mr-2 text-black ${index > 0 ? "cursor-pointer" : "cursor-no-drop"}`}
                                                onClick={() => {
                                                    if (index > 0) {
                                                        const updatedData = [...courseContentData];
                                                        updatedData.splice(index, 1);
                                                        setCourseContentData(updatedData);
                                                    }
                                                }}
                                            />
                                            <MdOutlineKeyboardArrowDown
                                                className="dark:text-white text-black text-lg"
                                                style={{
                                                    transform: isCollapse[index]
                                                        ? "rotate(180deg)"
                                                        : "rotate(0deg)",
                                                }}
                                                onClick={() => handleCollapseToggle(index)}
                                            />
                                        </div>
                                    </div>
                                    {
                                        !isCollapse[index] && (
                                            <>
                                                <div className="my-3">
                                                    <label className={`${styles.label}`}>Video Title</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Project Plan..."
                                                        className={`${styles.input}`}
                                                        value={item.title}
                                                        onChange={(e) => {
                                                            const updatedData = [...courseContentData];
                                                            updatedData[index].title = e.target.value;
                                                            setCourseContentData(updatedData);
                                                        }}
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className={styles.label}>Video Url</label>
                                                    <input
                                                        type="text"
                                                        placeholder="https://demovideourl/fdasfa"
                                                        className={`${styles.input}`}
                                                        value={item.videoUrl}
                                                        onChange={(e) => {
                                                            const updatedData = [...courseContentData];
                                                            updatedData[index].videoUrl = e.target.value;
                                                            setCourseContentData(updatedData);
                                                        }}
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className={styles.label}>Video Description</label>
                                                    <textarea
                                                        rows={8}
                                                        cols={30}
                                                        placeholder="Briefly describe about your content..."
                                                        className={`${styles.input} h-min py-2`}
                                                        value={item.description}
                                                        onChange={(e) => {
                                                            const updatedData = [...courseContentData];
                                                            updatedData[index].description = e.target.value;
                                                            setCourseContentData(updatedData);
                                                        }}
                                                    />
                                                    <br />
                                                    <br />

                                                </div>
                                                {
                                                    item?.links.map((link: any, linkIndex: number) => (
                                                        <div key={linkIndex} className="mb-3 block">
                                                            <div className="w-full flex items-center justify-between">
                                                                <label className={styles.label}>
                                                                    Link {linkIndex + 1}
                                                                </label>
                                                                <AiOutlineDelete
                                                                    className={`dark:text-white text-[20px] mr-2 text-black ${linkIndex === 0 ? "cursor-no-drop" : "cursor-pointer"}`}
                                                                    onClick={() =>
                                                                        linkIndex === 0
                                                                            ? null
                                                                            : handleRemoveLink(index, linkIndex)
                                                                    }
                                                                />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                placeholder="Source Code... (Link title)"
                                                                className={`${styles.input}`}
                                                                value={link.title}
                                                                onChange={(e) => {
                                                                    const updatedData = [...courseContentData];
                                                                    updatedData[index].links[linkIndex].title =
                                                                        e.target.value;
                                                                    setCourseContentData(updatedData);
                                                                }}
                                                            />
                                                            <input
                                                                type="text"
                                                                placeholder="Source Code Url... (Link URL)"
                                                                className={`${styles.input} mt-6`}
                                                                value={link.url}
                                                                onChange={(e) => {
                                                                    const updatedData = [...courseContentData];
                                                                    updatedData[index].links[linkIndex].url =
                                                                        e.target.value;
                                                                    setCourseContentData(updatedData);
                                                                }}
                                                            />
                                                        </div>
                                                    ))
                                                }
                                                <br />

                                                {/* add link button */}
                                                <div className="inline-block mb-4">
                                                    <p
                                                        className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                                                        onClick={() => handleAddLink(index)}
                                                    >
                                                        <BsLink45Deg className="mr-2" /> Add Link
                                                    </p>
                                                </div>
                                            </>
                                        )
                                    }
                                    <br />
                                    {/* add new content */}
                                    {index === courseContentData.length - 1 && (
                                        <div>
                                            <p
                                                className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                                                onClick={(e: any) => newContentHandler(item)}
                                            >
                                                <AiOutlinePlusCircle className="mr-2" /> Add New Content
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })
                }
                <br />
                <div
                    className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
                    onClick={() => addNewSection()}
                >
                    <AiOutlinePlusCircle className="mr-2" />
                    Add New Section
                </div>
            </form>
            <br />
            <div className="w-full flex items-center justify-between">
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={() => prevButton()}
                >
                    Prev
                </div>
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={() => handleOptions()}
                >
                    Next
                </div>
            </div>
        </div>
    )
}
