import { apiSlice } from '../api/apiSlice';

const layoutApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getHeroData: builder.query({
            query: (type) => ({
                url: `layout/get-layout/${type}`,
                method: "GET",
            })
        }),
        editHeroData: builder.mutation({
            query: (data) => ({
                url: "layout/edit-layout",
                method: "PUT",
                body: data,
            })
        })
    })
})

export const { useGetHeroDataQuery, useEditHeroDataMutation } = layoutApi;