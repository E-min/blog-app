import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  loading: false,
  error: false,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchBlogs: (state, { payload }) => {
      state.blogs = payload;
      state.loading = false;
    },
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchFailed: (state) => {
      state.error = true;
      state.loading = false;
    },
    updateBlogs: (state, { payload }) => {
      state.blogs = state.blogs.map((blog) => {
        if (blog.id === payload.id) {
          return {
            ...blog,
            likes: payload.totalLikes.length,
            likes_n: payload.totalLikes,
          };
        }
        return blog;
      });
    },
  },
});

export const { fetchFailed, fetchStart, fetchBlogs, updateBlogs } =
  blogSlice.actions;
export default blogSlice.reducer;
