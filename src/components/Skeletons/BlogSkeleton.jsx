import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

const paragraph = [
  "100",
  "100",
  "80",
  "90",
  "100",
  "85",
  "100",
  "90",
  "80",
  "95",
  "70",
];

export default function BlogSkeleton() {
  return (
    <Paper sx={{ p: 2, pb: 4 }}>
      <Box sx={{ borderBottom: 1, pb: 1 }}>
        <Typography>
          <Skeleton width={150} />
        </Typography>
        <Typography>
          <Skeleton width={120} />
        </Typography>
        <Typography>
          <Skeleton width={170} />
        </Typography>
      </Box>
      <Typography component="h2" variant="h4" sx={{ my: 2 }}>
        <Skeleton />
      </Typography>
      {paragraph.map((width, index) => (
        <Typography key={index}>
          <Skeleton width={`${width}%`} />
        </Typography>
      ))}
    </Paper>
  );
}
