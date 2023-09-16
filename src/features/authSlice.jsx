import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const auth = Cookies.get("auth") ?? sessionStorage.getItem("auth");
const initialState = auth
  ? JSON.parse(auth)
  : {
      currentUser: null,
      isLoggedIn: false,
      loading: false,
      error: false,
      errorMessage: {},
      token: null,
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, { payload }) => {
      state.currentUser = payload.data.user;
      state.token = payload.data.key;
      state.loading = false;
      state.isLoggedIn = true;
      payload.remember
        ? Cookies.set("auth", JSON.stringify(state), {
            expires: 7,
            // httpOnly: true,
            secure: true,
            sameSite: "Strict",
          })
        : sessionStorage.setItem("auth", JSON.stringify(state));
    },
    registerSuccess: (state, { payload }) => {
      state.currentUser = payload;
      state.token = payload.token;
      state.isLoggedIn = true;
      state.loading = false;
    },
    logoutSuccess: () => {
      location.reload();
      Cookies.remove("auth");
      sessionStorage.removeItem("auth");
    },
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchFailed: (state, { payload }) => {
      state.error = true;
      state.errorMessage = payload;
      state.loading = false;
    },
  },
});

export const {
  loginSuccess,
  registerSuccess,
  logoutSuccess,
  fetchStart,
  fetchFailed,
} = authSlice.actions;
export default authSlice.reducer;
