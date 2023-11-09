import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logout from "../thunks/logout";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const pages = [
  { title: "Blogs", to: "/blog-app" },
  { title: "About", to: "/blog-app/about" },
];
const settings = [
  { title: "Profile", to: "/blog-app/profile" },
  { title: "My Blogs", to: "/blog-app/myblogs" },
  { title: "Logout" },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { currentUser } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e) => {
    setAnchorElUser(null);
    if (e.currentTarget.id === "logout") {
      dispatch(logout());
    }
  };

  return (
    <AppBar position="absolute">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BlogApp
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  onClick={handleCloseNavMenu}
                  key={page.title}
                  component={NavLink}
                  to={page.to}
                >
                  {page.title}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BlogApp
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block", color: "text.primary" }}
                component={NavLink}
                to={page.to}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={currentUser.image} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  pb: 1,
                  px: 2,
                  borderBottom: 1,
                  borderColor: "primary.main",
                }}
              >
                {currentUser.username}
              </Typography>
              {settings.map((setting) => (
                <MenuItem
                  key={setting.title}
                  id={setting.title.toLowerCase()}
                  onClick={handleCloseUserMenu}
                  component={NavLink}
                  to={setting.to}
                >
                  {setting.title}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
