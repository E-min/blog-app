import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function CardSkeleton() {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Paper
        elevation={3}
        sx={{
          textAlign: "center",
          maxWidth: 300,
          mx: "auto",
          height: 294,
          pb: 3,
          pt: 1,
        }}
      >
        <Typography variant="h4" m={1}>
          <Skeleton />
        </Typography>
        <Skeleton variant="rectangular" height={150} />
        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 3 }}>
          <Skeleton variant="rounded" height={40} width={57} />
          <Skeleton variant="rounded" height={40} width={57} />
          <Skeleton variant="rounded" height={40} width={57} />
        </Box>
      </Paper>
    </Grid>
  );
}
