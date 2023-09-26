import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Comment from "./Comment";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";
import useSendComment from "../../../hooks/useSendComment";
import useGetCommentsById from "../../../hooks/useGetCommentsById";

export default function CommentSection({ blogId, convertDate }) {
  const [inputComment, setInputComment] = useState("");
  const { comments, getCommentsById } = useGetCommentsById();
  const { postComment, sendComment } = useSendComment();
  const maxCommentLength = 200;

  useEffect(() => {
    getCommentsById(blogId);
  }, []);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxCommentLength) {
      setInputComment(inputValue);
    } else {
      setInputComment(inputValue.slice(0, maxCommentLength));
    }
  };

  const handleSendComment = (e) => {
    e.preventDefault();
    const onSuccess = () => {
      setInputComment("");
      getCommentsById(blogId);
    };
    sendComment({ content: inputComment, post: blogId }, onSuccess);
  };

  return (
    <>
      <FormControl component="form" onSubmit={handleSendComment} fullWidth>
        <TextField
          id="standard-multiline-flexible"
          placeholder="Write your comment"
          multiline
          rows={4}
          margin="normal"
          value={inputComment}
          onChange={handleInputChange}
          error={postComment.error}
          helperText={postComment.error && postComment.errorMsg}
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
                {inputComment.length}/{maxCommentLength}
              </Typography>
            ),
          }}
        />
        <Button
          type="submit"
          disabled={postComment.loading}
          variant="contained"
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </FormControl>
      <Box sx={{ mt: 3, pb: 2, borderTop: 2 }}>
        {[comments.data].length ? (
          comments.data.map((comment) => (
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
        )}
      </Box>
    </>
  );
}
