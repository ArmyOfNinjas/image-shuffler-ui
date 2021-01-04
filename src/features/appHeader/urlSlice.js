import { createSlice } from "@reduxjs/toolkit";

export const urlSlice = createSlice({
  name: "urls",
  initialState: {
    value: [],
  },
  reducers: {
    setSelectedUrls: (state, action) => {
      console.log("setting urls:");
      console.log(action.payload);
      state.value = [...state.value, action.payload];
    },
    resetSelectedUrls: (state, action) => {
      console.log("resetting urls:");
      state.value = action.payload;
    },
  },
});

export const { setSelectedUrls, resetSelectedUrls } = urlSlice.actions;

export const selectUrls = (state) => state.urls.value;

export default urlSlice.reducer;
