import { logoutSuccess, fetchStart, fetchFailed } from "../features/authSlice";
import axiosWithToken from "../services/axiosWithToken";

const logout = () => {
  const blogAppWithToken = axiosWithToken();
  return async (dispatch) => {
    dispatch(fetchStart());
    try {
      await blogAppWithToken.post("/users/auth/logout/");
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(fetchFailed(error.response.data.non_field_errors[0]));
    }
  };
};

export default logout;
