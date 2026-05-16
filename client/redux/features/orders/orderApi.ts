import { apiSlice } from "../api/apiSlice";

const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => ({
                url: "order/get-all-orders",
                method: "GET"
            })
        }),

        getStripePublishableKey: builder.query({
            query: () => ({
                url: "order/payment/stripeStripePublishableKey",
                method: "GET"
            })
        }),

        createPaymentIntent: builder.mutation({
            query: (amount) => ({
                url: "order/payment",
                method: "POST",
                body: { amount },
            })
        }),

        createOrder: builder.mutation({
            query: ({ courseId, paymentInfo }) => ({
                url: "order/create-order",
                method: "POST",
                body: {
                    courseId, paymentInfo
                }
            })
        })
    })
})

export const { useGetAllOrdersQuery, useGetStripePublishableKeyQuery, useCreatePaymentIntentMutation, useCreateOrderMutation } = analyticsApi;