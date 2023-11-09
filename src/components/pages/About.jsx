import { Button, IconButton, Toolbar, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const About = () => {
    return (
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Paper sx={{padding: 3, borderRadius: 5, maxWidth: 400, textAlign: "center", marginTop: 10} }>
              <Avatar sx={{m: "auto"}} src="https://avatars.githubusercontent.com/u/89641439?v=4"></Avatar>
              <br />
              <Typography>Hello! My name is Mehmet Emin. This application is developed by me.</Typography>
              <br />
              <Typography>If you want to check out my other projects or contact me.</Typography>
              <br />
              <GitHubIcon />
              <LinkedInIcon />
              <EmailIcon />
            </Paper>
        </Box>
    )
};

export default About;
