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
    }),

})

export const { useCreateCourseMutation, useGetAllCoursesQuery, useEditCourseMutation, useGetUserAllCoursesQuery, useGetCourseDetailsQuery, useGetCourseContentQuery } = courseApi;