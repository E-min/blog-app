import { useState } from "react";
import axiosWithToken from "../services/axiosWithToken";

const useSendEditedBlog = () => {
  const [loadingSEB, setLoadingSEB] = useState(false);
  const [errorSEB, setErrorSEB] = useState(false);
  const blogAppWithToken = axiosWithToken();

  const sendEditedBlog = async (obj, id, refresh, setEditMode) => {
    setLoadingSEB(true);
    setErrorSEB(false)
    try {
      await blogAppWithToken.put(`/api/blogs/${id}/`, obj);
      await refresh(id)
      setEditMode(false)
    } catch (errorSEB) {
      console.log(errorSEB);
      setErrorSEB(true)
    } finally {
      setLoadingSEB(false);
    }
  };
  return { loadingSEB, errorSEB, sendEditedBlog };
};

export default useSendEditedBlog;
