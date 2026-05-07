import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "../auth/authSlice";

const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAvatar: builder.mutation({
            query: (avatar) => ({
                url: 'user/update-user-avatar',
                method: "PUT",
                body: avatar
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({
                        user: result.data.user
                    }));
                }
                catch (error) {
                    console.log(error);
                }
            },
        }),
        updateName: builder.mutation({
            query: ({ name, email }) => ({
                url: 'user/update-user-info',
                method: "PUT",
                body: {
                    name, email
                }
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({
                        user: result.data.user
                    }));
                }
                catch (error) {
                    console.log(error);
                }
            },
        }),

    })
});

export const { useUpdateAvatarMutation, useUpdateNameMutation } = userApi