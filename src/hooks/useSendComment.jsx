import { useState } from "react";
import axiosWithToken from "../services/axiosWithToken";

const initialState = {
  loading: false,
  error: false,
  errorMsg: "",
};

const useSendComment = () => {
  const blogAppWithToken = axiosWithToken();
  const [postComment, setPostComment] = useState(initialState);

  const sendComment = async (object, onSuccess) => {
    // Field required message
    if (object.content === "") {
      setPostComment({
        loading: false,
        error: true,
        errorMsg: "You can't send empty comment",
      });
      return;
    }

    setPostComment({ loading: true, error: false, errorMsg: "" });

    try {
      await blogAppWithToken.post(`/api/comments/${object.post}/`, object);
      onSuccess();
      setPostComment((prev) => ({ ...prev, loading: false }));
    } catch (error) {
      setPostComment({
        loading: false,
        error: true,
        errorMsg: error.message,
      });
    }
  };

  return { postComment, sendComment };
};

export default useSendComment;
