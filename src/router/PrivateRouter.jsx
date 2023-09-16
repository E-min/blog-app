import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

const PrivateRouter = () => {
  const { currentUser } = useSelector(({ auth }) => auth);
  return currentUser ? (
    <>
      <Navbar />
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          bgcolor: "background.default",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        <Toolbar />
        <Outlet />
        <Toolbar />
      </Box>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRouter;
