import { useState } from "react";
import blogApp from "../services/axiosWithBaseUrl";

const initialState = {
  loading: false,
  error: false,
  data: [],
};

const useGetCommentsById = () => {
  const [comments, setComments] = useState(initialState);

  const getCommentsById = async (id) => {
    setComments((prev) => ({ ...prev, loading: true, error: false }));
    try {
      const { data } = await blogApp.get(`/api/comments/${id}/`);
      setComments((prev) => ({ ...prev, data: data, loading: false }));
    } catch (error) {
      setComments((prev) => ({ ...prev, loading: false, error: true }));
    }
  };

  return { comments, getCommentsById };
};

export default useGetCommentsById;
