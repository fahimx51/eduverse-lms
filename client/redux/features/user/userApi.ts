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
        updatePassword: builder.mutation({
            query: ({ oldPassword, newPassword }) => ({
                url: 'user/update-user-password',
                method: "PUT",
                body: {
                    oldPassword, newPassword
                }
            }),
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: "user/get-all-users",
                method: "GET"
            })
        }),
        updateRole: builder.mutation({
            query: ({ email, role }) => ({
                url: "user/update-user-role",
                method: "PUT",
                body: {
                    email, role
                }
            })
        })
    })
});

export const { useUpdateAvatarMutation, useUpdateNameMutation, useUpdatePasswordMutation, useGetAllUsersQuery, useUpdateRoleMutation } = userApi