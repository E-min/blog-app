import { Routes, Route } from "react-router";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import PrivateRouter from "./PrivateRouter";
import About from "../components/pages/About";
import EffectField from "../components/animation/EffectField";
import Blogs from "../components/pages/Blogs/Blogs";
import Blog from "../components/pages/Blog/Blog";
import Box from "@mui/material/Box";
import MyBlogs from "../components/pages/MyBlogs/MyBlogs";
import Profile from "../components/pages/Profile";
import useTokenValidate from "../hooks/useTokenValidate";

const AppRouter = ({ isDarkTheme }) => {
  const { isLoggedIn } = useSelector(({ auth }) => auth);
  const tokenValidate = useTokenValidate();

  if (tokenValidate.loading) {
    return (
      <Box
        sx={{
          bgcolor: "background.default",
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg
          width="10%"
          height="10%"
          style={isDarkTheme ? { filter: "invert(100%)" } : {}}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect className="spinner_hzlK" x="1" y="1" width="6" height="22" />
          <rect
            className="spinner_hzlK spinner_koGT"
            x="9"
            y="1"
            width="6"
            height="22"
          />
          <rect
            className="spinner_hzlK spinner_YF1u"
            x="17"
            y="1"
            width="6"
            height="22"
          />
        </svg>
      </Box>
    );
  } else {
    return (
      <Routes>
        <Route path="/*" element={<Navigate to="/login" />} />
        <Route
          element={isLoggedIn ? <Navigate to="/blog-app" /> : <EffectField />}
        >
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/blog-app" element={<PrivateRouter />}>
          <Route index element={<Blogs />} />
          <Route path="myblogs" element={<MyBlogs />} />
          <Route path="profile" element={<Profile />} />
          <Route path=":id" element={<Blog />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    );
  }
};

export default AppRouter;
