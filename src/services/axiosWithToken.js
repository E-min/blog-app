import axios from "axios";
import store from "../app/store";
const URL = import.meta.env.VITE_APP_AUTH_BASE_URL;

const axiosWithToken = () => {
  const token = store.getState().auth.token;
  const blogAppWithToken = axios.create({
    baseURL: URL,
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return blogAppWithToken;
};

export default axiosWithToken;
