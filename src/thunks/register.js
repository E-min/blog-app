import {
  fetchFailed,
  fetchStart,
  registerSuccess,
} from "../features/authSlice";
import blogApp from "../services/axiosWithBaseUrl";

const register = (object) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    try {
      const { data } = await blogApp.post("/users/register/", object);
      dispatch(registerSuccess(data));
    } catch (error) {
      dispatch(fetchFailed(error.response.data));
    }
  };
};

export default register;
