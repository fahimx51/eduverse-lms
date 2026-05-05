import { apiSlice } from "../api/apiSlice";
import { userRegistration } from "./authSlice";

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
        })
    })
});

export const { useRegisterMutation, useActivationMutation } = authApi;