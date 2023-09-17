import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const URL = import.meta.env.VITE_APP_AUTH_BASE_URL;

const useGetBlogDetailsById = (data = {}) => {
  const { token } = useSelector(({ auth }) => auth);
  const [blog, setBlog] = useState(data);
  const [loading, setLoading] = useState(false);

  const getDetailsById = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api/blogs/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setBlog(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { blog, loading, getDetailsById };
};

export default useGetBlogDetailsById;
