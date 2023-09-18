import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import useGetBlogDetailsById from "./useGetBlogDetailsById";
const URL = import.meta.env.VITE_APP_AUTH_BASE_URL;

const useSendComment = () => {
  const { token } = useSelector(({ auth }) => auth);
  const [error, setError] = useState(false)
  const [commentLoading, setCommentLoading] = useState(false);

  const sendComment = async (id, object, refresh) => {
    setCommentLoading(true);
    setError(false)
    try {
      await axios.post(`${URL}/api/comments/${id}/`, object, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      await refresh(id);
    } catch (error) {
      console.log(error);
      setError(true)
    } finally {
      setCommentLoading(false);
    }
  };

  return { error, commentLoading, sendComment };
};

export default useSendComment;
