import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authReducer from "../features/authSlice";
import blogReducer from "../features/blogSlice"
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore(
  {
    reducer: {
      auth: authReducer,
      blog: blogReducer,
    },
  },
  applyMiddleware(thunk)
);

export default store;
