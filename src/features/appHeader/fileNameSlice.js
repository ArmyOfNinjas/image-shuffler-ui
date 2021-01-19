import { createSlice } from '@reduxjs/toolkit';

export const fileNameSlice = createSlice({
    name: "fileNames",
    initialState: {
        value: [],
    },
    reducers: {
        setFileNames: (state, action) => {
            state.value = [...state.value, action.payload];
            console.log(state.value)
        },
        resetFileNames: (state, action) => {
            state.value = action.payload;
        },
        setFileNamesToZero: (state, action) => {
            state.value = [];
        },
    },
});

export const { setFileNames, resetFileNames, setFileNamesToZero } = fileNameSlice.actions;

export const selectFileNames = (state) => state.fileNames.value;

export default fileNameSlice.reducer;
