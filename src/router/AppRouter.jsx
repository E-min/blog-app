import { Routes, Route } from "react-router";
import { Navigate } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import PrivateRouter from "./PrivateRouter";
import About from "../components/pages/About";
import { useDispatch, useSelector } from "react-redux";
import EffectField from "../components/animation/EffectField";
import Blogs from "../components/pages/Blogs/Blogs";
import Blog from "../components/pages/Blog/Blog";
import MyBlogs from "../components/pages/MyBlogs/MyBlogs";
import Profile from "../components/pages/Profile";
import { useEffect } from "react";
import useTokenValidate from "../hooks/useTokenValidate";
import { authChecker } from "../features/authSlice";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import Loading from "../assets/svg/bars-scale-fade.svg";
import { Box } from "@mui/material";

const AppRouter = ({ isDarkTheme }) => {
  const { isLoggedIn } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tokenValidate, validateToken } = useTokenValidate();

  useEffect(() => {
    const cookie = Cookies.get("auth") ?? sessionStorage.getItem("auth");
    if (cookie) {
      const auth = JSON.parse(cookie);
      const onSuccess = () => {
        dispatch(authChecker(auth));
        navigate("/blog-app");
      };
      const onFail = () => {
        navigate("/login");
      };
      validateToken(auth.token, onSuccess, onFail);
    }
  }, []);
  console.log(tokenValidate);
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
        <img
          src={"./bars-scale-fade.svg"}
          alt=""
          width={"10%"}
          style={isDarkTheme ? { filter: "invert(100%)" } : {}}
        />
      </Box>
    );
  } else {
    return (
      <Routes>
        {/* <Route path="/*" element={<Error />} /> */}
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
