import axios from "axios";
const URL = import.meta.env.VITE_APP_AUTH_BASE_URL;

const blogApp = axios.create({
  baseURL: URL,
});

export default blogApp;