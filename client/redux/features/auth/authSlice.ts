import { User } from '@/app/types/UserType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit' // Added PayloadAction for better types

interface AuthState {
    token: string;
    user: User | null;
}

const initialState: AuthState = {
    token: "",
    user: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userRegistration: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
        },
        userLoggedIn: (state, action: PayloadAction<{ token?: string, user?: User }>) => {
            if (action.payload.token) {
                state.token = action.payload.token;
                localStorage.setItem("user", "true");
            }
            if (action.payload.user) {
                state.user = action.payload.user;
            }
        },
        userLoggedOut: (state) => {
            state.token = "";
            state.user = null;
            localStorage.removeItem("user");
        }
    }
});

export const { userRegistration, userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;