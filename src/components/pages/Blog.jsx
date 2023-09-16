import { useEffect } from "react";
import { useParams } from "react-router";
import getDetailsById from "../../services/getDetailsById";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";

const Blog = () => {
  const { token } = useSelector(({ auth }) => auth);
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
    setLoading(true);
    try {
      const data = await getDetailsById(id, token);
      setBlog(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const convertToLocalDate = (rawDate) => {
    const dateObject = new Date(rawDate);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return dateObject.toLocaleDateString("en-US", options);
  };
  console.log(blog);
  return (
    <Paper elevation={0} sx={{}}>
      <Box sx={{ px: 2 }}>
        <p>Author: {blog.author}</p>
        <p>Category: {blog.category_name}</p>
        <p>Publish Date: {convertToLocalDate(blog.publish_date)}</p>
      </Box>
      <Box sx={{ px: 2 }}>
        <h1>{blog.title}</h1>
        <p>{blog.content}</p>
      </Box>
    </Paper>
  );
};

export default Blog;
