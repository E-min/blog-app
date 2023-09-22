import {
  fetchFailed,
  fetchStart,
  registerSuccess,
} from "../features/authSlice";
import axiosWithToken from "../services/axiosWithToken";

const register = (object) => {
  const blogAppWithToken = axiosWithToken();
  return async (dispatch) => {
    dispatch(fetchStart());
    try {
      const { data } = await blogAppWithToken.post("/users/register/", object);
      dispatch(registerSuccess(data));
    } catch (error) {
      dispatch(fetchFailed(error.response.data));
    }
  };
};

export default register;
