import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn } from '../auth/authSlice';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        refreshToken: builder.query({
            query: (data) => ({
                url: 'user/refresh-token',
                method: 'GET',
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({
                        token: result.data.accessToken,
                    }));
                }
                catch (error) {
                    console.log(error);
                }
            }
        }),
        loadUser: builder.query({
            query: (data) => ({
                url: 'user/me',
                method: 'GET',
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
            }
        })
    }),
});

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;