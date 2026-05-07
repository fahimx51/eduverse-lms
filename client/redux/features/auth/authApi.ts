import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";

type RegistrationResponse = {
    message: string;
    activationToken: string;
};

type RegistrationData = {
    name: string;
    email: string;
    password: string;
};

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: 'user/register',
                method: 'POST',
                body: data,
                credentials: 'include' as const,

            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userRegistration({
                        token: result.data.activationToken
                    }));
                }
                catch (error) {
                    console.log(error);
                }
            },
        }),
        activation: builder.mutation({
            query: ({ activationToken, activationCode }) => ({
                url: `user/activate-user`,
                method: 'POST',
                body: {
                    activationToken,
                    activationCode
                }
            }),
        }),

        login: builder.mutation({
            query: ({ email, password }) => ({
                url: `user/login-user`,
                method: 'POST',
                body: {
                    email,
                    password
                }
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({
                        token: result.data.accessToken,
                        user: result.data.user
                    }));
                }
                catch (error) {
                    console.log(error);
                }
            },
        }),

        socialAuth: builder.mutation({
            query: ({ email, password, avatar }) => ({
                url: `user/social-auth`,
                method: 'POST',
                body: {
                    email,
                    password,
                    avatar
                }
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({
                        token: result.data.accessToken,
                        user: result.data.user
                    }));
                }
                catch (error) {
                    console.log(error);
                }
            },
        }),

        logOut: builder.query({
            query: () => ({
                url: `user/logout-user`,
                method: 'POST',
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    dispatch(userLoggedOut());
                }
                catch (error) {
                    console.log(error);
                }
            },
        }),

    })
});

export const { useRegisterMutation, useActivationMutation, useLoginMutation, useSocialAuthMutation, useLogOutQuery } = authApi;