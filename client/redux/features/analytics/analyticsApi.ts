import { apiSlice } from "../api/apiSlice";

const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCoursesAnalytics: builder.query({
            query: () => ({
                url: "analytics/get-course-analytics",
                method: "GET"
            })
        }),

        getOrdersAnalytics: builder.query({
            query: () => ({
                url: "analytics/get-order-analytics",
                method: "GET"
            })
        }),

        getUsersAnalytics: builder.query({
            query: () => ({
                url: "analytics/get-user-analytics",
                method: "GET"
            })
        }),

    })
})

export const { useGetCoursesAnalyticsQuery, useGetOrdersAnalyticsQuery, useGetUsersAnalyticsQuery } = analyticsApi;