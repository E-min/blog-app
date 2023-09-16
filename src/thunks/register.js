import axios from "axios";
import {
  fetchFailed,
  fetchStart,
  registerSuccess,
} from "../features/authSlice";

const URL = import.meta.env.VITE_APP_AUTH_BASE_URL;

const register = (object) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${URL}/users/register/`, object);
      dispatch(registerSuccess(data));
    } catch (error) {
      dispatch(fetchFailed(error.response.data));
    }
  };
};

export default register;
