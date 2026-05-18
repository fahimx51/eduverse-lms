import { apiSlice } from "../api/apiSlice";

export const notificationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllNotifications: builder.query({
            query: () => ({
                url: "notification/get-all-notifications",
                method: "GET",
            }),
        }),
        updateNotificationStatus: builder.mutation({
            query: (id) => ({
                url: `notification/update-notification/${id}`,
                method: "POST",
            }),
        }),
    }),
});

export const {
    useGetAllNotificationsQuery,
    useUpdateNotificationStatusMutation,
} = notificationsApi;