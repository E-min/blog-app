import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

const Comment = ({ comment, convertDate }) => {
  return (
    <Box sx={{ p: 2, bgcolor: "action.hover", borderRadius: 2, mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: 1,
          py: 1,
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar />
          <Typography>{comment.user}</Typography>
        </Box>
        <Typography textAlign="center">{convertDate(comment.time_stamp)}</Typography>
      </Box>
      <Typography sx={{ mb: 2 }}>{comment.content}</Typography>
    </Box>
  );
};

export default Comment;
