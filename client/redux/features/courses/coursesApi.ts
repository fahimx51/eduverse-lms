import { apiSlice } from "../api/apiSlice";

const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (data) => ({
                url: "course/upload-course",
                method: "POST",
                body: data,

            })
        }),
        getAllCourses: builder.query({
            query: () => ({
                url: "course/get-all-courses",
                method: "GET"
            })
        }),
        editCourse: builder.mutation({
            query: ({ id, data }) => ({
                url: `course/edit-course/${id}`,
                method: "PUT",
                body: data,
            })
        }),
        getUserAllCourses: builder.query({
            query: () => ({
                url: "course/get-courses",
                method: "GET"
            })
        }),
        getCourseDetails: builder.query({
            query: ({ id }) => ({
                url: `course/get-course/${id}`,
                method: "GET"
            })
        }),
        getCourseContent: builder.query({
            query: ({ id }) => ({
                url: `course/get-course-content/${id}`,
                method: "GET"
            })
        }),
        addNewQuestion: builder.mutation({
            query: ({ question, courseId, contentId }) => ({
                url: "course/add-question",
                method: "PUT",
                body: {
                    question, courseId, contentId
                }

            })
        }),
        addAnswer: builder.mutation({
            query: ({ answer, courseId, questionId, contentId }) => ({
                url: "course/add-answer",
                method: "PUT",
                body: {
                    answer, courseId, questionId, contentId
                }
            })
        }),
        addReview: builder.mutation({
            query: ({ review, rating, courseId }) => ({
                url: `course/add-review/${courseId}`,
                method: "PUT",
                body: {
                    review, rating
                }
            })
        }),

        addReplyToReview: builder.mutation({
            query: ({ comment, courseId, reviewId }) => ({
                url: `course/add-reply`,
                method: "PUT",
                body: {
                    comment, courseId, reviewId
                }
            })
        })
    }),

})

export const { useCreateCourseMutation, useGetAllCoursesQuery, useEditCourseMutation, useGetUserAllCoursesQuery, useGetCourseDetailsQuery, useGetCourseContentQuery, useAddNewQuestionMutation, useAddAnswerMutation, useAddReviewMutation, useAddReplyToReviewMutation } = courseApi;