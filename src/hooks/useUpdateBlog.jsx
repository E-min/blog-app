import { useState } from "react";
import axiosWithToken from "../services/axiosWithToken";

const useUpdateBlog = () => {
  const [updateBlog, setUpdateBlog] = useState({
    loading: false,
    error: false,
  });
  const blogAppWithToken = axiosWithToken();

  const callUpdateBlog = async (obj, id, onSuccess) => {
    const data = {
      ...obj,
      content: JSON.stringify(obj.content),
    };
    setUpdateBlog({ loading: true, error: false });
    try {
      await blogAppWithToken.put(`/api/blogs/${id}/`, data);
      onSuccess();
      setUpdateBlog({ loading: false, error: false });
    } catch (error) {
      console.log(error);
      setUpdateBlog({ loading: false, error: true });
      if(error.response?.statusText === "Unauthorized") {
        location.reload()
      }
    }
  };

  return { updateBlog, callUpdateBlog };
};

export default useUpdateBlog;
