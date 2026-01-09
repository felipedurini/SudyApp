import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  status: "idle", // idle | loading | error
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.status = "loading";
    },
    loginSuccess(state, action) {
      state.status = "idle";
      state.token = action.payload.token;
      state.user = action.payload.user;
      
      localStorage.setItem("token", action.payload.token);
    }
    ,
    loginError(state) {
      state.status = "error";
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.status = "idle";
      
      localStorage.removeItem("token");
    }
    ,
  },
});

export const {
  loginStart,
  loginSuccess,
  loginError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
