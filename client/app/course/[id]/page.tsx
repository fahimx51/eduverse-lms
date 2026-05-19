import CourseDetailsPage from "@/app/components/Courses/CourseDetailsPage";
import Protected from "@/app/hooks/useProtected";

export default function Page() {

    return (

        <Protected>
            <CourseDetailsPage />
        </Protected>
    )
}