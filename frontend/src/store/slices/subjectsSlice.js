import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  status: "idle", // idle | loading | error
};

const subjectsSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    fetchStart(state) {
      state.status = "loading";
    },
    fetchSuccess(state, action) {
      state.status = "idle";
      state.list = action.payload;
    },
    fetchError(state) {
      state.status = "error";
    },
  },
});

export const { fetchStart, fetchSuccess, fetchError } = subjectsSlice.actions;
export default subjectsSlice.reducer;
