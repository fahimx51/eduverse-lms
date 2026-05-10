import { styles } from '@/app/styles/style';
import React, { useState } from 'react'

type Props = {
    courseInfo: object,
    setCourseInfo: (courseInfo: object) => void;
    active: number,
    setActive: (active: number) => void;
}

export default function CourseInformation({ courseInfo, setCourseInfo, active, setActive }: Props) {

    const [image, setDragging] = useState(false);

    const [imageFile, setImageFile] = useState("");


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setActive(active + 1);
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(URL.createObjectURL(file));
        console.log(URL.createObjectURL(file));

        if (file) {
            setCourseInfo({ ...courseInfo, thumbnail: file })
        }
    }

    return (
        <div className='w-[80%] m-auto mt-24'>
            <form onSubmit={handleSubmit} className={`${styles.label}`}>
                <div>
                    <label htmlFor="name">
                        Course Name
                    </label>
                    <input
                        type="text"
                        name=""
                        id="name"
                        required
                        value={courseInfo?.name}
                        onChange={(e) => setCourseInfo({ ...courseInfo, name: e.target.value })}
                        placeholder="Mern Stack and LMS platform with next latest"
                        className={`${styles.input}`}
                    />
                </div>
                <br />
                <div className='mb-5'>
                    <label htmlFor="description">
                        Course Description
                    </label>

                    <textarea
                        name=""
                        id="description"
                        cols={30}
                        rows={10}
                        required
                        placeholder='Write something amazing...'
                        className={`${styles.input} h-min py-2`}
                    >
                    </textarea>
                </div>
                <br />

                <div className='w-full flex justify-between'>
                    <div className='w-[48%]'>
                        <label htmlFor="price" className={`${styles.label}`}>
                            Course Price
                        </label>
                        <input
                            type="number"
                            name=""
                            id="price"
                            required
                            value={courseInfo.price}
                            onChange={(e) => setCourseInfo({ ...courseInfo, price: e.target.value })}
                            placeholder="29"
                            className={`${styles.input}`}
                        />
                    </div>

                    <div className='w-[48%]'>
                        <label htmlFor="estPrice" className={`${styles.label}`}>
                            Estimated Price (Optional)
                        </label>
                        <input
                            type="number"
                            name=""
                            id="estPrice"
                            required
                            value={courseInfo.estimatedPrice}
                            onChange={(e) => setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })}
                            placeholder="59"
                            className={`${styles.input}`}
                        />
                    </div>
                </div>
                <br />

                <div>
                    <label htmlFor="tags">
                        Course Tags
                    </label>
                    <input
                        type="text"
                        name=""
                        id="tags"
                        required
                        value={courseInfo.tags}
                        onChange={(e) => setCourseInfo({ ...courseInfo, tags: e.target.value })}
                        placeholder="Node Js, Express Js, Socket.io, Tailwind, Javascript"
                        className={`${styles.input}`}
                    />
                </div>
                <br />

                <div className='w-full flex justify-between'>
                    <div className='w-[48%]'>
                        <label htmlFor="level" className={`${styles.label}`}>
                            Course Level
                        </label>
                        <input
                            type="text"
                            name=""
                            id="level"
                            required
                            value={courseInfo.level}
                            onChange={(e) => setCourseInfo({ ...courseInfo, level: e.target.value })}
                            placeholder="Begineer / Intermidate / Expert"
                            className={`${styles.input}`}
                        />
                    </div>

                    <div className='w-[48%]'>
                        <label htmlFor="demoUrl" className={`${styles.label}`}>
                            Demo Url
                        </label>
                        <input
                            type="text"
                            name=""
                            id="demoUrl"
                            required
                            value={courseInfo?.demoUrl}
                            onChange={(e) => setCourseInfo({ ...courseInfo, demoUrl: e.target.value })}
                            placeholder="https://youtube.com/fdalsfje43eds"
                            className={`${styles.input}`}
                        />
                    </div>
                </div>
                <br />

                <div className="w-full">
                    <input
                        type="file"
                        accept="image/*"
                        id="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <label
                        htmlFor="file"
                        className="w-full min-h-[6vh] dark:border-white border-slate-600 hover:bg-black/60 cursor-pointer border flex items-center justify-center "
                    >
                        {
                            imageFile ? (
                                <img src={imageFile} alt="Thumbnail Image" className="w-full h-full object-cover max-h-50  z-[-1]" />
                            ) : (

                                <span className="block font-bold text-gray-600">
                                    Click here to select thumbnail
                                </span>

                            )
                        }
                    </label>
                </div>
                <br />

                <div className="w-full flex items-center justify-end">
                    <input
                        type="submit"
                        value="Next"
                        className="w-full 800px:w-[180px] h-[40px] bg-[#05768a] text-center font-semibold hover:shadow-md text-lg text-[#fff] rounded mt-8 cursor-pointer"
                    />
                </div>
            </form>
        </div>
    )
}
