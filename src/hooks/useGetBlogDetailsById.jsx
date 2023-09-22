import { useState } from "react";
import axiosWithToken from "../services/axiosWithToken";

const useGetBlogDetailsById = () => {
  const blogAppWithToken = axiosWithToken();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(false);

  const getDetailsById = async (id) => {
    setLoading(true);
    try {
      const { data } = await blogAppWithToken.get(`/api/blogs/${id}/`);
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
