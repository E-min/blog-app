import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import register from "../../thunks/register";
import { useState } from "react";
import EffectField from "../animation/EffectField";
import { useTheme } from "@mui/material/styles";
import Copyright from "../copyright/Copyright";

const formInitialState = {
  username: "",
  email: "",
  image: "",
  bio: "",
  password: "",
  password2: "",
};

const Register = () => {
  const { loading, errorMessage, isLoggedIn } = useSelector(({ auth }) => auth);
  const [formInputs, setFromInputs] = useState(formInitialState);
  const dispatch = useDispatch();
  const theme = useTheme();

  const passwordError = Object.keys(errorMessage).includes("password");
  const emailError = Object.keys(errorMessage).includes("email");
  const usernameError = Object.keys(errorMessage).includes("username");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(register(formInputs)).then(() => {
      if (isLoggedIn) {
        navigate("/dashboard");
      }
    });
  };

  const handleInputChange = ({ target }) => {
    setFromInputs({ ...formInputs, [target.id]: target.value });
  };

  return (
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          borderRadius: "1rem",
          border: "1px solid white",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography color="text.primary" component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              variant="standard"
              value={formInputs.username}
              onChange={handleInputChange}
              error={usernameError}
              helperText={usernameError && errorMessage.username[0]}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              variant="standard"
              value={formInputs.email}
              onChange={handleInputChange}
              error={emailError}
              helperText={emailError && errorMessage.email[0]}
            />
            <TextField
              margin="normal"
              fullWidth
              id="image"
              label="Profile Image Url"
              name="image"
              type="url"
              variant="standard"
              value={formInputs.image}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="bio"
              label="Profile Bio"
              name="bio"
              type="url"
              variant="standard"
              value={formInputs.bio}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              variant="standard"
              value={formInputs.password}
              onChange={handleInputChange}
              autoComplete="current-password"
              error={passwordError}
              helperText={passwordError && errorMessage.password[0]}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Confirm Password"
              type="password"
              id="password2"
              variant="standard"
              value={formInputs.password2}
              onChange={handleInputChange}
              autoComplete="current-password"
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disableElevation
              color="secondary"
              loading={loading}
            >
              Sign Up
            </LoadingButton>
            <Typography variant="h7" color="text.primary">
              Do you have an account?
              <Link style={{ color: theme.palette.secondary.main }} to={"/login"}>
                {" "}
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
};

export default Register;
