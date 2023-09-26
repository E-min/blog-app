import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useGetBlogDetailsById from "../../../hooks/useGetBlogDetailsById";
import PostAndUpdateBlogsModal from "../MyBlogs/PostAndUpdateBlogsModal";
import { useSelector } from "react-redux";
import CommentSection from "./CommentSection";
import BlogSkeleton from "../../Skeletons/BlogSkeleton";

const convertToLocalDate = (rawDate) => {
  const dateObject = new Date(rawDate);

  // Set the hours to the user's local time
  // dateObject.setHours(dateObject.getHours());

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
    // second: "numeric",
    // hour12: false
  };

  return dateObject.toLocaleDateString("en-US", options);
};

const Blog = () => {
  const { id } = useParams();
  const { blog, loading, getDetailsById } = useGetBlogDetailsById();
  const [openEditModal, setOpenEditModal] = useState(false);
  const { currentUser } = useSelector(({ auth }) => auth);
  const authorMode = currentUser.username === blog.author;

  useEffect(() => {
    getDetailsById(id);
  }, []);

  return (
    <Box maxWidth="sm" mx="auto" px={1}>
      <Toolbar />
      {authorMode && (
        <>
          <PostAndUpdateBlogsModal
            openModal={openEditModal}
            handleClose={() => setOpenEditModal(false)}
            blog={blog}
            refreshBlog={getDetailsById}
          />
          <Button
            variant="contained"
            onClick={() => setOpenEditModal(true)}
            sx={{ float: "right", m: 2 }}
          >
            Edit
          </Button>
        </>
      )}
      {loading ? (
        <BlogSkeleton />
      ) : (
        <Paper sx={{ p: 2, pb: 4 }}>
          <Box sx={{ borderBottom: 1, pb: 1 }}>
            <Typography>Author: {blog.author}</Typography>
            <Typography>Category: {blog.category_name}</Typography>
            <Typography>
              Publish Date: {convertToLocalDate(blog.publish_date)}
            </Typography>
          </Box>
          <Typography component="h2" variant="h4" sx={{ my: 2 }}>
            {blog.title}
          </Typography>
          {blog.content
            ?.slice(1, -1)
            .split(/\\n/g)
            .map((line, i) => (
              <Typography sx={{ letterSpacing: 0.6, mb: 3 }} key={i}>
                {JSON.parse(`"${line}"`)}
              </Typography>
            ))}
        </Paper>
      )}
      <Paper sx={{ mt: 4, p: 2 }}>
        <CommentSection blogId={id} convertDate={convertToLocalDate} />
      </Paper>
    </Box>
  );
};

export default Blog;
