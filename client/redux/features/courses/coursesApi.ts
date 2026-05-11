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
        })
    }),

})

export const { useCreateCourseMutation, useGetAllCoursesQuery } = courseApi;