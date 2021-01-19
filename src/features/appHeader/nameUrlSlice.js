import { createSlice } from '@reduxjs/toolkit';

export const nameUrlSlice = createSlice({
    name: "namesUrls",
    initialState: {
        value: [],
    },
    reducers: {
        setNamesUrls: (state, action) => {
            state.value = [...state.value, action.payload];
        },
        resetNamesUrls: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setNamesUrls, resetNamesUrls } = nameUrlSlice.actions;

export const selectNamesUrls = (state) => state.namesUrls.value;

export default nameUrlSlice.reducer;
