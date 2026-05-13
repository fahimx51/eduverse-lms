import { apiSlice } from "../api/apiSlice";

const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => ({
                url: "order/get-all-orders",
                method: "GET"
            })
        }),

    })
})

export const { useGetAllOrdersQuery } = analyticsApi;