import { createSlice } from "@reduxjs/toolkit";

export const dateTimeSlice = createSlice({
  name: "dateTime",
  initialState: {
    value: null,
  },
  reducers: {
    setDate: (state, action) => {
      state.value = action.payload;
    },
    unsetDate: (state) => {
      state.value = null;
    },
  },
});

export const { setDate, unsetDate } = dateTimeSlice.actions;

export const selectDateTime = (state) => state.dateTime.value;

export default dateTimeSlice.reducer;
