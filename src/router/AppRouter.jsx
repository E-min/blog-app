import { Routes, Route } from "react-router";
import { Navigate } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import PrivateRouter from "./PrivateRouter";
import NewBlog from "../components/pages/NewBlog";
import About from "../components/pages/About";
import { useSelector } from "react-redux";
import EffectField from "../components/animation/EffectField";
import Blogs from "../components/pages/Blogs/Blogs";
import Blog from "../components/pages/Blog";

const AppRouter = () => {
  const { isLoggedIn } = useSelector(({ auth }) => auth);

  return (
    <Routes>
      <Route
        path="/*"
        element={
          isLoggedIn ? <Navigate to="/blogs" /> : <Navigate to="/login" />
        }
      />
      <Route element={isLoggedIn ? <Navigate to="/blogs" /> : <EffectField />}>
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
      </Route>
      <Route path="/blogs" element={<PrivateRouter />}>
        <Route index element={<Blogs />} />
        <Route path="newblog" element={<NewBlog />} />
        <Route path=":id" element={<Blog />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
