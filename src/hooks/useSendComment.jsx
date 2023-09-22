import { useState } from "react";
import axiosWithToken from "../services/axiosWithToken";

const useSendComment = () => {
  const blogAppWithToken = axiosWithToken();
  const [error, setError] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);

  const sendComment = async (id, object, getComments) => {
    setCommentLoading(true);
    setError(false);
    try {
      await blogAppWithToken.post(`/api/comments/${id}/`, object);
      await getComments(id);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setCommentLoading(false);
    }
  };

  return { error, commentLoading, sendComment };
};

export default useSendComment;
