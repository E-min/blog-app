import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetBlogDetailsById from "./useGetBlogDetailsById";
import { updateBlogs } from "../features/blogSlice";
import axios from "axios";
const URL = import.meta.env.VITE_APP_AUTH_BASE_URL;

const useLikeUnlike = (data) => {
  const { blog, getDetailsById } = useGetBlogDetailsById(data);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  const likeUnlike = async (id) => {
    setLoading(true);
    try {
      await axios.post(`${URL}/api/likes/${id}/`, null, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      await getDetailsById(id);
      dispatch(updateBlogs(response));
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return { blog, loading, likeUnlike };
};

export default useLikeUnlike;
