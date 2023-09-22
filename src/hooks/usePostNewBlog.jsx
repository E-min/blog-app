import { useState } from "react";
import axiosWithToken from "../services/axiosWithToken";
import { useDispatch } from "react-redux";
import getBlogs from "../thunks/getBlogs";

const usePostNewBlog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const blogAppWithToken = axiosWithToken();
  const dispatch = useDispatch();

  const postNewBlog = async (obj, onSuccess) => {
    setLoading(true);
    setError(false);
    try {
      await blogAppWithToken.post("/api/blogs/", obj);
      dispatch(getBlogs());
      onSuccess();
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, postNewBlog };
};

export default usePostNewBlog;
