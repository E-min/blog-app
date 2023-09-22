import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import getBlogs from "../../../thunks/getBlogs";
import Card from "../Blogs/Card";
import { useState } from "react";
import { useRef } from "react";
import useDeleteBlogs from "../../../hooks/useDeleteBlogs";
import PostNewBlogsModal from "./PostNewBlogsModal";

const MyBlogs = () => {
  const { currentUser } = useSelector(({ auth }) => auth);
  const { blogs } = useSelector(({ blog }) => blog);
  const {loadingDel, errorDel, deleteBlogs } = useDeleteBlogs();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openNewPost, setOpenNewPost] = useState(false);
  const dispatch = useDispatch();
  const confirmDelBlog = useRef();

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  const handleOpenPostNewBlogs = () => {
    setOpenNewPost(true);
  };

  const handleOpenDeleteConfirm = (title, id) => {
    confirmDelBlog.current = { id, title };
    setOpenConfirm(true);
  };

  const handleDelete = () => {
    const onSuccess = () => {
      setOpenConfirm(false)
    }
    deleteBlogs(confirmDelBlog.current.id, onSuccess);
  };

  const userBlogs = blogs.filter(
    (blog) => blog.author === currentUser.username
  );

  return (
    <Box maxWidth="lg" m="auto" px={4}>
      <PostNewBlogsModal
        handleClose={() => setOpenNewPost(false)}
        openModal={openNewPost}
      />
      <Modal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        aria-labelledby="modal-delete-confirm"
        aria-describedby="modal-delete-confirmation"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography sx={{ color: "text.primary", mb: 4 }}>
            Are you sure?{" "}
            <strong>{openConfirm && confirmDelBlog.current.title}</strong> will
            be deleted.
          </Typography>
          <Button disabled={loadingDel} onClick={handleDelete} variant="contained">
            Yes
          </Button>
          <Button onClick={() => setOpenConfirm(false)}>No</Button>
          {errorDel && <Typography sx={{color: "error.main", mt: 1}}>
            Couldn't deleted</Typography>}
        </Box>
      </Modal>
      <Box my={4}>
        <Button
          component="label"
          onClick={handleOpenPostNewBlogs}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Post Blogs
        </Button>
      </Box>
      <Grid container spacing={4}>
        {userBlogs.length ? (
          userBlogs.map((blog) => (
            <Card key={blog.title + blog.id} data={blog}>
              <IconButton
                onClick={() => handleOpenDeleteConfirm(blog.title, blog.id)}
              >
                <DeleteIcon sx={{ color: "error.main" }} />
              </IconButton>
            </Card>
          ))
        ) : (
          <Typography sx={{color: "text.secondary"}} mx="auto" mt={2}>There is no posted blogs</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default MyBlogs;
