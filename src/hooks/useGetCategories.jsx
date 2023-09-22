import { useState } from "react";
import blogApp from "../services/axiosWithBaseUrl";

const initialState = { loading: false, error: false, data: [] };

const useGetCategories = () => {
  const [categories, setCategories] = useState(initialState);

  const getBlogCategories = async () => {
    setCategories((prev) => ({ ...prev, loading: true }));
    try {
      const { data } = await blogApp.get("/api/categories/");
      setCategories((prev) => ({ ...prev, data: data }));
    } catch (error) {
        setCategories(prev => ({...prev, error: true}))
    } finally {
      setCategories((prev) => ({ ...prev, loading: false }));
    }
  };

  return {categories, getBlogCategories}
};

export default useGetCategories;
