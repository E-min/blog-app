import axios from "axios";
import { fetchFailed, fetchStart, fetchBlogs } from "../features/blogSlice";

const URL = import.meta.env.VITE_APP_AUTH_BASE_URL;

const getBlogs = () => {
  return async (dispatch) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.get(`${URL}/api/blogs/`);
      dispatch(fetchBlogs(data));
    } catch (error) {
      dispatch(fetchFailed(error.response.data.non_field_errors[0]));
    }
  };
};

export default getBlogs;
