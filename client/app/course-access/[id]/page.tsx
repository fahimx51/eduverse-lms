import Wrapper from "@/app/components/CourseAccess/Wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'My Course | EduVerse',
    description: 'Elearning platform for students to learn and get help from teachers',
    keywords: 'Programming, Web Development, Machine Learning, MERN Stack'
}

export default function Page() {

    return (
        <Wrapper />
    )
}