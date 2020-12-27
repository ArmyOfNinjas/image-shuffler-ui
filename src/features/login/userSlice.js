import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: null,
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
            // state.user = {
            //     uid: action.payload.uid,
            //     photo: action.payload.photo,
            //     email: action.payload.email,
            //     displayName: action.payload.displayName
            // }
            // console.log(action.payload)
            // console.log(state.user)
        },
        logout: (state) => {
            state.value = null;
        }
    },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.value;

export default userSlice.reducer;
