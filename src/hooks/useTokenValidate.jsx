import { useState, useEffect } from "react";
import blogApp from "../services/axiosWithBaseUrl";
import Cookies from "js-cookie";
import { authChecker } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function useTokenValidate() {
  const [tokenValidate, setTokenValidate] = useState({
    loading: false,
    error: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const validateToken = async (token, onSuccess, onFail) => {
    setTokenValidate({ loading: true, error: false });
    const headers = {
      Authorization: `Token ${token}`,
    };
    try {
      await blogApp("/users/auth/user", { headers });
      setTimeout(() => {
        setTokenValidate({ loading: false, error: true });
      }, 1000);
      onSuccess();
    } catch (err) {
      console.log(err);
      onFail();
      setTokenValidate({ loading: false, error: true });
    }
  };

  return tokenValidate;
}
