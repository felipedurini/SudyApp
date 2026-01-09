import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  status: "idle", // idle | loading | error
};

const notesSlice = createSlice({
  name: "notes",
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

export const { fetchStart, fetchSuccess, fetchError } = notesSlice.actions;
export default notesSlice.reducer;
