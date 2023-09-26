import { useState } from "react";
import axiosWithToken from "../services/axiosWithToken";

const useSendComment = () => {
  const blogAppWithToken = axiosWithToken();
  const [error, setError] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);

  const sendComment = async (object, getComments) => {
    setCommentLoading(true);
    setError(false);
    try {
      await blogAppWithToken.post(`/api/comments/${object.post}/`, object);
      await getComments(object.post);
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
