'use client'
import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../features/api/apiSlice'
import authSlice from '../features/auth/authSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

// Extract types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const initializeApp = async () => {
    // 1. Check if we are in the browser environment
    if (typeof window !== "undefined") {
        const hasSession = localStorage.getItem("user");

        if (hasSession) {
            try {
                // 2. Run sequential auth handshake
                await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true }));
                await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true }));
            } catch (error) {
                // If the token is invalid, clean up the hint
                localStorage.removeItem("user");
            }
        }
    }
};

// 3. Execution check
if (typeof window !== "undefined") {
    initializeApp();
}