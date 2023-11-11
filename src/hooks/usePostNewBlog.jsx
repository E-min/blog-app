import { useState } from "react";
import axiosWithToken from "../services/axiosWithToken";
import { useDispatch } from "react-redux";
import getBlogs from "../thunks/getBlogs";

const usePostNewBlog = () => {
  const [newBlog, setNewBlog] = useState({ loading: false, error: false });
  const blogAppWithToken = axiosWithToken();
  const dispatch = useDispatch();

  const callPostBlog = async (obj, onSuccess) => {
    const data = {
      ...obj,
      content: JSON.stringify(obj.content),
    };
    setNewBlog({ loading: true, error: false });
    try {
      await blogAppWithToken.post("/api/blogs/", data);
      dispatch(getBlogs());
      onSuccess();
      setNewBlog({ loading: false, error: false });
    } catch (error) {
      setNewBlog({ loading: false, error: true });
      if(error.response?.statusText === "Unauthorized") {
        location.reload()
      }
    }
  };

  return { newBlog, callPostBlog };
};

export default usePostNewBlog;
