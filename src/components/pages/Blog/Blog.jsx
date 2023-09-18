import { useEffect } from "react";
import { useParams } from "react-router";
import {
  Box,
  Button,
  FormControl,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import useGetBlogDetailsById from "../../../hooks/useGetBlogDetailsById";
import Comment from "./Comment";
import { useState } from "react";
import useSendComment from "../../../hooks/useSendComment";

const Blog = () => {
  const { id } = useParams();
  const { blog, loading, getDetailsById } = useGetBlogDetailsById();
  const [inputText, setInputText] = useState({ post: id, content: "" });
  const { error, commentLoading, sendComment } = useSendComment();
  const maxCommentLength = 200;

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
      setInputText((prev) => ({ ...prev, content: inputValue }));
    } else {
      setInputText((prev) => ({
        ...prev,
        content: inputValue.slice(0, maxCommentLength),
      }));
    }
  };
  const handleSendComment = (e) => {
    e.preventDefault();
    e.target.reset();
    setInputText({ post: id, content: "" });
    sendComment(id, inputText, getDetailsById);
  };

  return (
    <Box maxWidth="sm" mx="auto">
      <Toolbar />
      <Paper sx={{ p: 2, pb: 4 }}>
        <Box sx={{ borderBottom: 1, mb: 1, py: 1 }}>
          <Typography>Author: {blog.author}</Typography>
          <Typography>Category: {blog.category_name}</Typography>
          <Typography>
            Publish Date: {convertToLocalDate(blog.publish_date)}
          </Typography>
        </Box>
        <Typography component="h2" variant="h4" sx={{ my: 2 }}>
          {blog.title}
        </Typography>
        <Typography sx={{ letterSpacing: 0.5 }}>{blog.content}</Typography>
      </Paper>
      <Paper sx={{ mt: 4, p: 2 }}>
        <FormControl component="form" onSubmit={handleSendComment} fullWidth>
          <TextField
            id="standard-multiline-flexible"
            placeholder="Write your comment"
            multiline
            rows={4}
            sx={{ my: 2 }}
            value={inputText.content}
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
                  {inputText.content.length}/{maxCommentLength}
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
