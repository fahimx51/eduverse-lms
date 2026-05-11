import { apiSlice } from "../api/apiSlice";

const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (data) => ({
                url: "course/upload-course",
                method: "POST",
                body: data,

            })
        })
    })
})

export const { useCreateCourseMutation } = courseApi;