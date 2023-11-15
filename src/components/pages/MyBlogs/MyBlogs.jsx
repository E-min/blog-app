import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import PostAndUpdateBlogsModal from "./PostAndUpdateBlogsModal";
import useDeleteBlogs from "../../../hooks/useDeleteBlogs";
import CardSkeleton from "../../Skeletons/CardSkeleton";
import getBlogs from "../../../thunks/getBlogs";
import Card from "../Blogs/Card";
import { motion } from "framer-motion";

const MyBlogs = () => {
  const { currentUser } = useSelector(({ auth }) => auth);
  const { blogs, loading } = useSelector(({ blog }) => blog);
  const { delBlogs, deleteBlogs } = useDeleteBlogs();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openNewPost, setOpenNewPost] = useState(false);
  const dispatch = useDispatch();
  const confirmDelBlog = useRef();
  const userBlogs = blogs.filter(
    (blog) => blog.author === currentUser.username
  );

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
      setOpenConfirm(false);
      dispatch(getBlogs());
    };
    deleteBlogs(confirmDelBlog.current.id, onSuccess);
  };

  return (
    <Box maxWidth="lg" m="auto" px={4} className="scrollable-content">
      <PostAndUpdateBlogsModal
        handleClose={() => setOpenNewPost(false)}
        openModal={openNewPost}
      />
      <Modal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        aria-labelledby="modal-delete-confirm"
        aria-describedby="modal-delete-confirmation"
      >
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              maxWidth: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography sx={{ color: "text.primary", mb: 4 }}>
              Are you sure?{" "}
              <strong>{openConfirm && confirmDelBlog.current.title}</strong>{" "}
              will be deleted.
            </Typography>
            <Button
              sx={{ mr: 2 }}
              disabled={delBlogs.loading}
              onClick={handleDelete}
              variant="contained"
            >
              Yes
            </Button>
            <Button onClick={() => setOpenConfirm(false)}>No</Button>
            {delBlogs.error && (
              <Typography sx={{ color: "error.main", mt: 1 }}>
                Couldn't deleted
              </Typography>
            )}
          </Box>
        </motion.div>
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
        {loading ? (
          Array.from({ length: 8 }, (_, index) => <CardSkeleton key={index} />)
        ) : userBlogs.length ? (
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
          <Typography sx={{ color: "text.secondary" }} mx="auto" mt={2}>
            There is no posted blogs
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default MyBlogs;
