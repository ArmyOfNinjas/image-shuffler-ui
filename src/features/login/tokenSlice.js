import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    value: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.value = action.payload;
    },
    unsetToken: (state) => {
      state.value = null;
    },
  },
});

export const { setToken, unsetToken } = tokenSlice.actions;

export const selectToken = (state) => state.token.value;

export default tokenSlice.reducer;
