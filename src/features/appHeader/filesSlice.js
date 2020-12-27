import { createSlice } from '@reduxjs/toolkit';

export const filesSlice = createSlice({
    name: "files",
    initialState: {
        value: null,
    },
    reducers: {
        setSelectedFiles: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setSelectedFiles } = filesSlice.actions;

export const selectFiles = (state) => state.files.value;

export default filesSlice.reducer;
