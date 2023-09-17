import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
const URL = import.meta.env.VITE_APP_AUTH_BASE_URL;

const useSendComment = () => {
  const { token } = useSelector(({ auth }) => auth);
  const [commentLoading, setCommentLoading] = useState(false);

  const sendComment = async (id, object) => {
    setCommentLoading(true);
    try {
      await axios.post(`${URL}/api/comments/${id}/`, object, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setCommentLoading(false);
    }
  };

  return { commentLoading, sendComment };
};

export default useSendComment;
