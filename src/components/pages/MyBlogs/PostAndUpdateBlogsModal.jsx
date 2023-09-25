import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import CategoriesSelect from "../CategoriesSelect";
import usePostNewBlog from "../../../hooks/usePostNewBlog";
import useUpdateBlog from "../../../hooks/useUpdateBlog";

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
  blog = {},
  refreshBlog,
}) {
  const [formInput, setFormInput] = useState(initialState);
  const { loading, error, postNewBlog } = usePostNewBlog();
  const { updateBlog } = useUpdateBlog();
  const editModeActive = Object.keys(blog).length !== 0;

  useEffect(() => {
    if (editModeActive) {
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
    setFormInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSumbitNewBlog = () => {
    const onSuccessfullSent = () => {
      handleClose();
      setFormInput(initialState);
    };
    postNewBlog(
      { ...formInput, content: JSON.stringify(formInput.content) },
      onSuccessfullSent
    );
  };

  const handleSubmitUpdateBlog = () => {
    updateBlog(
      { ...formInput, content: JSON.stringify(formInput.content) },
      blog.id,
      refreshBlog,
      handleClose
    );
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-delete-confirm"
      aria-describedby="modal-delete-confirmation"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          py: 4,
          px: 2,
          maxHeight: "100vh",
          overflowY: "auto",
        }}
        maxWidth="sm"
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
            onClick={
              editModeActive ? handleSubmitUpdateBlog : handleSumbitNewBlog
            }
            variant="contained"
            disabled={loading}
          >
            {editModeActive ? "Save" : "Send"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
