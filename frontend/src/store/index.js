import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import subjectsReducer from "./slices/subjectsSlice";
import notesReducer from "./slices/notesSlice";

const token = localStorage.getItem("token");

export const store = configureStore({
  reducer: {
    auth: authReducer,
    subjects: subjectsReducer,
    notes: notesReducer,
  },
  preloadedState: {
    auth: {
      token,
      user: token ? {} : null,
      status: "idle",
    },
  },
});
