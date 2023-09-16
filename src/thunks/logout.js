import axios from "axios";
import store from "../app/store";
import { logoutSuccess, fetchStart, fetchFailed } from "../features/authSlice";

const URL = import.meta.env.VITE_APP_AUTH_BASE_URL;

const logout = () => {
  const token = store.getState().auth.token;
  return async (dispatch) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${URL}/users/auth/logout/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(fetchFailed(error.response.data.non_field_errors[0]));
    }
  };
};

export default logout;
