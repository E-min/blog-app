import { useState } from "react";
import axiosWithToken from "../services/axiosWithToken";

const useDeleteBlogs = () => {
  const blogAppWithToken = axiosWithToken();
  const [delBlogs, setDelBlogs] = useState(false);

  const deleteBlogs = async (id, onSuccess) => {
    setDelBlogs({ loading: true, error: false });
    try {
      await blogAppWithToken.delete(`/api/blogs/${id}`);
      onSuccess();
      setDelBlogs({ loading: false, error: false });
    } catch (error) {
      setDelBlogs({ loading: false, error: true });
    }
  };

  return { delBlogs, deleteBlogs };
};

export default useDeleteBlogs;
