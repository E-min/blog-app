import { useState } from "react";
import blogApp from "../services/axiosWithBaseUrl";

export default function useTokenValidate() {
  const [tokenValidate, setTokenValidate] = useState({
    loading: false,
    error: false,
  });

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

  return { tokenValidate, validateToken };
}
