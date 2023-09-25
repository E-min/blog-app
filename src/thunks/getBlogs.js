import { fetchFailed, fetchStart, fetchBlogs } from "../features/blogSlice";
import blogApp from "../services/axiosWithBaseUrl";

const getBlogs = () => {
  return async (dispatch) => {
    dispatch(fetchStart());
    try {
      const { data } = await blogApp.get(`/api/blogs/`);
      dispatch(fetchBlogs(data));
    } catch (error) {
      dispatch(fetchFailed(error));
    }
  };
};

export default getBlogs;
