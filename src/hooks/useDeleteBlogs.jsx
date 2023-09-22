import { useState } from "react";
import axiosWithToken from "../services/axiosWithToken";
import { useDispatch } from "react-redux";
import getBlogs from "../thunks/getBlogs";

const useDeleteBlogs = () => {
  const blogAppWithToken = axiosWithToken();
  const [loadingDel, setLoadingDel] = useState(false);
  const [errorDel, setErrorDel] = useState(false);
  const dispatch = useDispatch()

  const deleteBlogs = async (id, onSuccess) => {
    setLoadingDel(true);
    setErrorDel(false);
    try {
      await blogAppWithToken.delete(`/api/blogs/${id}`);
      dispatch(getBlogs());
      onSuccess()
    } catch (error) {
      setErrorDel(true);
    } finally {
      setLoadingDel(false);
    }
  };

  return {loadingDel, errorDel, deleteBlogs}
};

export default useDeleteBlogs;
