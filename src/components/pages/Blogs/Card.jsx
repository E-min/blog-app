import { Box, Grid, Paper, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatIcon from "@mui/icons-material/Chat";
import IconButton from "@mui/material/IconButton";
import { useSelector } from "react-redux";
import useLikeUnlike from "../../../hooks/useLikeUnlike";

const Card = ({ data, onClick }) => {
  const { currentUser } = useSelector(({ auth }) => auth);
  const { blog, loading, likeUnlike } = useLikeUnlike(data);

  const handleLikeClick = () => {
    likeUnlike(data.id);
  };

  const isUserLiked = blog?.likes_n?.some(
    (like) => like.user_id === currentUser.id
  );

  const likeBtnColor = isUserLiked && "primary.main";

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Paper
        elevation={3}
        sx={{
          textAlign: "center",
          maxWidth: 300,
          mx: "auto",
        }}
      >
        <Box
          onClick={onClick}
          sx={{
            pb: 3,
            pt: 1,
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          <Typography my={2}>{blog.title}</Typography>
          <Box
            sx={{
              width: "100%",
              height: 150,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              px: 2,
            }}
          >
            <img
              src={blog.image}
              alt=""
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            py: 1,
          }}
        >
          <IconButton
            color="inherit"
            variant="outlined"
            sx={{ borderRadius: 2, color: likeBtnColor }}
            onClick={handleLikeClick}
            disabled={loading}
          >
            <ThumbUpIcon />
            <Typography ml={1}>{blog.likes}</Typography>
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "57px",
              borderRadius: 2,
            }}
          >
            <VisibilityIcon />
            <Typography ml={1}>{blog.post_views}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "57px",
              borderRadius: 2,
            }}
          >
            <ChatIcon />
            <Typography ml={1}>{blog.comment_count}</Typography>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Card;
