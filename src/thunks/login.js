import axios from "axios";
import { fetchFailed, fetchStart, loginSuccess } from "../features/authSlice";

const URL = import.meta.env.VITE_APP_AUTH_BASE_URL;

const login = (email, password,remember) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${URL}/users/auth/login/`, {
        email,
        password,
      });
      dispatch(loginSuccess({data, remember}));
    } catch (error) {
      dispatch(fetchFailed(error.response.data.non_field_errors[0]));
    }
  };
};

export default login;
