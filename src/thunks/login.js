import { fetchFailed, fetchStart, loginSuccess } from "../features/authSlice";
import blogApp from "../services/axiosWithBaseUrl";

const login = (email, password, remember) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    try {
      const { data } = await blogApp.post(`/users/auth/login/`, {
        email,
        password,
      });
      dispatch(loginSuccess({ data, remember }));
    } catch (error) {
      dispatch(fetchFailed(error.response.data.non_field_errors[0]));
    }
  };
};

export default login;
