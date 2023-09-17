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
  const { commentLoading, sendComment } = useSendComment();

  useEffect(() => {
    getDetailsById(id);
  }, []);

  const convertToLocalDate = (rawDate) => {
    const dateObject = new Date(rawDate);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return dateObject.toLocaleDateString("en-US", options);
  };

  const handleInputChange = (e) => {
    setInputText((prev) => ({ ...prev, content: e.target.value }));
  };
  const handleSendComment = (e) => {
    e.preventDefault();
    e.target.reset();
    setInputText({ post: id, content: "" });
    sendComment(id, inputText);
    getDetailsById(id);
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
      <Paper sx={{ mt: 4, p: 2, pb: 0 }}>
        <FormControl component="form" onSubmit={handleSendComment} fullWidth>
          <TextField
            id="standard-multiline-flexible"
            placeholder="Write your comment"
            multiline
            rows={4}
            sx={{ my: 2 }}
            value={inputText.comment}
            onChange={handleInputChange}
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
        <Box sx={{ mt: 3, py: 3, borderTop: 2 }}>
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
              <Typography sx={{ textAlign: "center", color: "grey" }}>
                No Comments
              </Typography>
            )
          ) : (
            <Typography sx={{ textAlign: "center", color: "grey" }}>
              No Comments
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Blog;
