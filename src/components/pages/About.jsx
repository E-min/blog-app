import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import React, { useRef } from "react";
import copy from "clipboard-copy";
import { useState } from "react";

const CopyToClipboardList = ({ text, icon }) => {
  const [notifyBubble, setNotifyBubble] = useState();
  const textRef = useRef(null);

  const handleCopyClick = async () => {
    try {
      await copy(textRef.current.innerText);
      setNotifyBubble(
        <Paper
          elevation={4}
          sx={{ position: "absolute", left: "50%", bottom: -10, padding: 0.5 }}
        >
          <Typography fontSize={13}>Copied!</Typography>
        </Paper>
      );
      setTimeout(() => {
        setNotifyBubble();
      }, 2000);
    } catch (err) {
      console.error("Unable to copy text to clipboard:", err);
    }
  };

  return (
    <li onClick={handleCopyClick}>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          padding: 1,
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
      >
        {icon}
        <Typography
          sx={{
            fontSize: 14,
            whiteSpace: "nowrap",
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          ref={textRef}
        >
          {text}
        </Typography>
        {notifyBubble}
      </Box>
    </li>
  );
};

const About = () => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Paper
        sx={{
          padding: 3,
          borderRadius: 5,
          maxWidth: 300,
          textAlign: "center",
          marginTop: 10,
        }}
      >
        <Avatar
          sx={{ width: 100, height: 100, mx: "auto" }}
          src="https://avatars.githubusercontent.com/u/89641439?v=4"
        ></Avatar>
        <br />
        <Typography>
          Hello! My name is Mehmet Emin. This application is developed by me.
        </Typography>
        <br />
        <Typography>
          If you want to check out my other projects or contact me.
        </Typography>
        <br />
        <ul style={{ listStyleType: "none", padding: 0, textAlign: "left" }}>
          <CopyToClipboardList
            text={"github.com/E-min"}
            icon={<GitHubIcon sx={{ fontSize: 40, mr: 1 }} />}
          />
          <CopyToClipboardList
            text={"www.linkedin.com/in/eminkocabuga"}
            icon={<LinkedInIcon sx={{ fontSize: 40, mr: 1 }} />}
          />
          <CopyToClipboardList
            text={"eminkocabuga@gmail.com"}
            icon={<EmailIcon sx={{ fontSize: 40, mr: 1 }} />}
          />
        </ul>
      </Paper>
    </Box>
  );
};

export default About;
