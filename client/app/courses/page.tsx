import { Metadata } from "next";
import Header from "../components/Header";
import CoursesPageWrapper from "../components/Courses/CoursesPageWrapper";
import Protected from "../hooks/useProtected";

export const metadata: Metadata = {
    title: 'Courses | EduVerse',
    description: 'Elearning platform for students to learn and get help from teachers',
    keywords: 'Programming, Web Development, Machine Learning, MERN Stack'
}

export default function Page() {

    return (
        <Protected>
            <div className="w-full bg-white dark:bg-slate-950/90">
                <Header />
                <CoursesPageWrapper />
            </div>
        </Protected>
    )
}