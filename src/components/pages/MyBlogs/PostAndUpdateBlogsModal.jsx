import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import CategoriesSelect from "../CategoriesSelect";
import usePostNewBlog from "../../../hooks/usePostNewBlog";
import useUpdateBlog from "../../../hooks/useUpdateBlog";
import { motion } from "framer-motion";
import { Scale } from "@mui/icons-material";
import { Paper } from "@mui/material";

const initialState = {
  category: "",
  image: "",
  title: "",
  content: "",
  status: "p",
};

export default function PostAndUpdateBlogsModal({
  handleClose,
  openModal,
  blog,
  refreshBlog,
}) {
  const [formInput, setFormInput] = useState(initialState);
  const { newBlog, callPostBlog } = usePostNewBlog();
  const { updateBlog, callUpdateBlog } = useUpdateBlog();

  useEffect(() => {
    if (blog) {
      const { category, image, title, content, status } = blog;
      setFormInput({
        category,
        image,
        title,
        content: JSON.parse(content),
        status,
      });
    }
  }, [blog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSumbitNewBlog = () => {
    const onSuccess = () => {
      handleClose();
      setFormInput(initialState);
    };
    callPostBlog(formInput, onSuccess);
  };

  const handleSubmitUpdateBlog = () => {
    const onSuccess = () => {
      refreshBlog(blog.id);
      handleClose();
    };
    callUpdateBlog(formInput, blog.id, onSuccess);
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-edit-content"
      aria-describedby="modal-edit-content"
      className="scrollable-content"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
        <Box
          sx={{
            maxHeight: "100vh",
          }}
        >
          <motion.div
            initial={{ transform: "scale(0.5)" }}
            animate={{ transform: "scale(1)" }}
            transition={{ duration: 0.1 }}
          >
            <Paper
              sx={{
                boxShadow: 24,
                py: 4,
                px: 2,
              }}
            >
              <CategoriesSelect
                value={formInput.category}
                error={false}
                handleChange={handleChange}
              />
              <TextField
                margin="normal"
                label="Cover Image Url"
                name="image"
                id="image"
                fullWidth
                value={formInput.image}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                label="Title"
                name="title"
                id="title"
                fullWidth
                value={formInput.title}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                label="Contnet"
                name="content"
                id="content"
                fullWidth
                multiline
                minRows={5}
                value={formInput.content}
                onChange={handleChange}
              />
              <Box sx={{ textAlign: "right", mt: 2 }}>
                <Button sx={{ mr: 1 }} onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  onClick={blog ? handleSubmitUpdateBlog : handleSumbitNewBlog}
                  variant="contained"
                  disabled={blog ? updateBlog.loading : newBlog.loading}
                >
                  {blog ? "Save" : "Send"}
                </Button>
              </Box>
            </Paper>
          </motion.div>
        </Box>
    </Modal>
  );
}
