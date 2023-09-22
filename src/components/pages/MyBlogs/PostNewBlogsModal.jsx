import { Box, Button, FormControl, Modal, TextField } from "@mui/material";
import CategoriesSelect from "../CategoriesSelect";
import { useState } from "react";
import usePostNewBlog from "../../../hooks/usePostNewBlog";

const initialState = {
  category: "",
  image: "",
  title: "",
  content: "",
  status: "p",
};

export default function PostNewBlogsModal({ handleClose, openModal }) {
  const [formInput, setFormInput] = useState(initialState);
  const { loading, error, postNewBlog } = usePostNewBlog();

  const handleChange = (e) => {
    setFormInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSumbit = () => {
    const onSuccessfullSent = () => {
      handleClose();
      setFormInput(initialState);
    };
    postNewBlog(formInput, onSuccessfullSent);
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
          p: 4,
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
          multiline
          value={formInput.image}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Title"
          name="title"
          id="title"
          fullWidth
          multiline
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
        <Button
          onClick={handleSumbit}
          sx={{ float: "right", mt: 2 }}
          variant="contained"
          disabled={loading}
        >
          SEND
        </Button>
      </Box>
    </Modal>
  );
}
