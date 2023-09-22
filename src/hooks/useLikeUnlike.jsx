import { useState } from "react";
import axiosWithToken from "../services/axiosWithToken";
import { useDispatch } from "react-redux";
import { updateBlogs } from "../features/blogSlice";

const useLikeUnlike = () => {
  const [loading, setLoading] = useState(false);
  const blogAppWithToken = axiosWithToken();
  const dispatch = useDispatch();

  const likeUnlike = async (id) => {
    setLoading(true);
    try {
      const { data } = await blogAppWithToken.post(`/api/likes/${id}/`);
      const totalLikes = data
        .filter((like) => like.post === id)
        .map((like) => ({ id: like.id, user_id: like.user, post: like.post }));
        
      dispatch(updateBlogs({ id, totalLikes }));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, likeUnlike };
};

export default useLikeUnlike;
