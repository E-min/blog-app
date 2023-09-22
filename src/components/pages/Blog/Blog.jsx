import { useEffect } from "react";
import { useParams } from "react-router";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Paper,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import useGetBlogDetailsById from "../../../hooks/useGetBlogDetailsById";
import Comment from "./Comment";
import { useState } from "react";
import useSendComment from "../../../hooks/useSendComment";
import { useSelector } from "react-redux";
import useGetCategories from "../../../hooks/useGetCategories";
import useSendEditedBlog from "../../../hooks/useSendEditedBlog";

const Blog = () => {
  const { error, commentLoading, sendComment } = useSendComment();
  const { categories, getBlogCategories } = useGetCategories();
  const { loadingSEB, errorSEB, sendEditedBlog } = useSendEditedBlog();
  const { id } = useParams();
  const { currentUser } = useSelector(({ auth }) => auth);
  const { blog, loading, getDetailsById } = useGetBlogDetailsById();
  const [inputComment, setInputComment] = useState({ post: id, content: "" });
  const [editModeInput, setEditModeInput] = useState();
  const maxCommentLength = 200;
  const authorMode = currentUser.username === blog.author;
  const [editMode, setEditMode] = useState(false);

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

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxCommentLength) {
      setInputComment((prev) => ({ ...prev, content: inputValue }));
    } else {
      setInputComment((prev) => ({
        ...prev,
        content: inputValue.slice(0, maxCommentLength),
      }));
    }
  };

  const handleSendComment = (e) => {
    e.preventDefault();
    e.target.reset();
    setInputComment({ post: id, content: "" });
    sendComment(id, inputComment, getDetailsById);
  };

  const handleEditMode = () => {
    const { id, title, content, image, category, status } = blog;
    setEditMode(true);
    setEditModeInput({ id, title, content, image, category, status });
  };

  const handleEditModeInputChange = (e) => {
    setEditModeInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSendEditedBlog = () => {
    sendEditedBlog(editModeInput, id, getDetailsById, setEditMode);
  };

  return (
    <Box maxWidth="sm" mx="auto">
      <Toolbar />
      <Box sx={{ float: "right", m: 2 }}>
        {authorMode &&
          (editMode ? (
            <>
              <Button onClick={() => setEditMode(false)}>Cancel</Button>
              <Button
                color="success"
                variant="contained"
                onClick={handleSendEditedBlog}
                disabled={loadingSEB}
              >
                Save
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              onClick={handleEditMode}
              disabled={categories.loading}
            >
              Edit
            </Button>
          ))}
      </Box>
      <Paper sx={{ p: 2, pb: 4 }}>
        <Box sx={{ borderBottom: 1, pb: 1 }}>
          <Typography>Author: {blog.author}</Typography>
          {editMode ? (
            <>
              <label id="category-label">Category: </label>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={editModeInput.category}
                label="Age"
                size="small"
                error={errorSEB}
                variant="standard"
                onChange={handleEditModeInputChange}
              >
                {categories.data.map((category) => (
                  <MenuItem key={category.name} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </>
          ) : (
            <Typography>Category: {blog.category_name}</Typography>
          )}
          <Typography>
            Publish Date: {convertToLocalDate(blog.publish_date)}
          </Typography>
        </Box>
        {editMode ? (
          <>
            <TextField
              margin="normal"
              label="Cover Image Url"
              name="image"
              id="image"
              fullWidth
              multiline
              error={errorSEB}
              value={editModeInput.image}
              onChange={handleEditModeInputChange}
            />
            <TextField
              margin="dense"
              label="Title"
              name="title"
              id="title"
              fullWidth
              multiline
              error={errorSEB}
              value={editModeInput.title}
              onChange={handleEditModeInputChange}
            />
            <TextField
              margin="dense"
              label="Contnet"
              name="content"
              id="content"
              fullWidth
              multiline
              value={editModeInput.content}
              error={errorSEB}
              helperText={errorSEB && "Edited Blog Couldn't sent"}
              onChange={handleEditModeInputChange}
            />
          </>
        ) : (
          <>
            <Typography component="h2" variant="h4" sx={{ my: 2 }}>
              {blog.title}
            </Typography>
            <Typography sx={{ letterSpacing: 0.5 }}>{blog.content}</Typography>
          </>
        )}
      </Paper>
      <Paper sx={{ mt: 4, p: 2 }}>
        <FormControl component="form" onSubmit={handleSendComment} fullWidth>
          <TextField
            id="standard-multiline-flexible"
            placeholder="Write your comment"
            multiline
            rows={4}
            sx={{ my: 2 }}
            value={inputComment.content}
            onChange={handleInputChange}
            error={error}
            helperText={error && "Comment couldn't sent"}
            InputProps={{
              endAdornment: (
                <Typography
                  sx={{
                    position: "absolute",
                    bottom: 5,
                    right: 10,
                    color: "text.secondary",
                    fontSize: 14,
                  }}
                >
                  {inputComment.content.length}/{maxCommentLength}
                </Typography>
              ),
            }}
            required
          />
          <Button
            type="submit"
            disabled={commentLoading}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </FormControl>
        <Box sx={{ mt: 3, pb: 2, borderTop: 2 }}>
          {blog.comments ? (
            blog.comments.length ? (
              blog.comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  convertDate={convertToLocalDate}
                />
              ))
            ) : (
              <Typography sx={{ textAlign: "center", color: "grey", mt: 2 }}>
                No Comments
              </Typography>
            )
          ) : (
            <Typography sx={{ textAlign: "center", color: "grey", mt: 2 }}>
              No Comments
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Blog;
