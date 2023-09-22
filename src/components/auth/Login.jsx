import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import login from "../../thunks/login";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Copyright from "../copyright/Copyright";
import { IconButton, InputAdornment } from "@mui/material";
import { VisibilityOff } from "@mui/icons-material";
import { Visibility } from "@mui/icons-material";

const formInitialState = {
  email: "",
  password: "",
  remember: false,
};

const Login = () => {
  const { loading, error, errorMessage } = useSelector(({ auth }) => auth);
  const [formInputs, setFromInputs] = useState(formInitialState);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, remember } = formInputs;
    dispatch(login(email, password, remember));
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInputChange = ({ target }) => {
    setFromInputs({ ...formInputs, [target.id]: target.id === "remember" ? target.checked : target.value });
  };
  
  return (
    <Container
      maxWidth="xs"
      sx={{
        backgroundColor: "rgba(255,255,255,0.2)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        borderRadius: "1rem",
        border: "1px solid rgba(255,255,255, 0.5)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        zIndex: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: "1rem 0",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography color="text.primary" component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formInputs.email}
            onChange={handleInputChange}
            variant="standard"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="start"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            id="password"
            value={formInputs.password}
            onChange={handleInputChange}
            variant="standard"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox id="remember" value="remember" color="primary" onClick={handleInputChange} />}
            label={
              <span style={{ color: theme.palette.text.primary }}>
                Remember me
              </span>
            }
          />
          <Typography color="error">{error && errorMessage}</Typography>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disableElevation
            loading={loading}
          >
            Sign In
          </LoadingButton>
          <Typography sx={{ color: "text.primary" }}>
            Don't have an account?
            <Link
              style={{ color: theme.palette.primary.main }}
              to={"/register"}
            >
              {" "}
              Sign Up
            </Link>
          </Typography>
        </Box>
        <Copyright sx={{ mt: 8, mb: 1 }} />
      </Box>
    </Container>
  );
};

export default Login;
