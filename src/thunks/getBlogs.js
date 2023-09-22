import { fetchFailed, fetchStart, fetchBlogs } from "../features/blogSlice";
import blogApp from "../services/axiosWithBaseUrl";

const getBlogs = () => {
  return async (dispatch) => {
    dispatch(fetchStart());
    try {
      const { data } = await blogApp.get(`/api/blogs/`);
      dispatch(fetchBlogs(data));
    } catch (error) {
      dispatch(fetchFailed(error.response.data.non_field_errors[0]));
    }
  };
};

export default getBlogs;
