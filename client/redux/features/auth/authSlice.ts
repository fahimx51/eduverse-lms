import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: "",
    user: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userRegistration: (state, action) => {
            state.token = action.payload.token;
        },
        userLoggedIn: (state, action) => {
            if (action.payload.token) {
                state.token = action.payload.token;
            }
            if (action.payload.user) {
                state.user = action.payload.user;
            }
        },
        userLoggedOut: (state) => {
            state.token = "";
            state.user = "";
        }
    }
});

export const { userRegistration, userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer; 