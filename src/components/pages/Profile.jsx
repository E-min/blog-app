import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { Fragment } from "react";

export default function Profile() {
  const { currentUser } = useSelector(({ auth }) => auth);

  const arrayedUserInfos = (user) => {
    const { last_name, first_name, username, email } = user;
    const userInfos = [
      {
        title: "First Name",
        content: first_name.length ? first_name : "...",
      },
      { title: "Last Name", content: last_name.length ? last_name : "..." },
      { title: "Username", content: username },
      { title: "Email", content: email },
    ];
    return userInfos;
  };

  return (
    <Box maxWidth="sm" mx="auto">
      <Toolbar />
      <Paper elevation={3} sx={{ mx: 1, p: 2, pt: 4 }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box>
              <Avatar
                alt={currentUser.username}
                src={currentUser.image}
                sx={{ width: 100, height: 100, mx: "auto" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                mb: 2,
              }}
            >
              <Typography>Bio</Typography>
              <Typography
                sx={{
                  p: 1,
                  borderRadius: 1,
                  bgcolor: "action.hover",
                  flex: 1
                }}
              >
                {currentUser.bio.length ? currentUser.bio : "..."}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            {arrayedUserInfos(currentUser).map((info) => (
              <Fragment key={info.title}>
                <Typography>{info.title}</Typography>
                <Typography
                  sx={{
                    width: "100%",
                    bgcolor: "action.hover",
                    borderRadius: 1,
                    p: 1,
                    mb: 2,
                  }}
                >
                  {info.content}
                </Typography>
              </Fragment>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
