import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Comment from "./Comment";
import SendIcon from "@mui/icons-material/Send";
import useSendComment from "../../../hooks/useSendComment";
import { useState } from "react";

export default function CommentSection({ blog, convertDate }) {
  const [inputComment, setInputComment] = useState({
    post: blog.id,
    content: "",
  });
  const { error, commentLoading, sendComment } = useSendComment();
  const maxCommentLength = 200;

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
    setInputComment({ post: blog.id, content: "" });
    sendComment(blog.id, inputComment, getDetailsById);
  };
  return (
    <>
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
                convertDate={convertDate}
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
    </>
  );
}
