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

const Blog = () => {
  const { id } = useParams();
  const { blog, loading, getDetailsById } = useGetBlogDetailsById();
  const [openEditModal, setOpenEditModal] = useState(false);
  const { currentUser } = useSelector(({ auth }) => auth);
  const authorMode = currentUser.username === blog.author;

  useEffect(() => {
    getDetailsById(id);
  }, []);

  const convertToLocalDate = (rawDate) => {
    const dateObject = new Date(rawDate);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    return dateObject.toLocaleDateString("en-US", options);
  };

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
      {loading ? (<BlogSkeleton />) : (<Paper sx={{ p: 2, pb: 4 }}>
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
        <Typography sx={{ letterSpacing: 0.5 }}>
          {blog.content
            ?.slice(1, -1)
            .split("\\n")
            .map((line, i) => (
              <Fragment key={i}>
                {line}
                <br />
              </Fragment>
            ))}
        </Typography>
      </Paper>)}
      <Paper sx={{ mt: 4, p: 2 }}>
        <CommentSection blog={blog} convertDate={convertToLocalDate} />
      </Paper>
    </Box>
  );
};

export default Blog;
