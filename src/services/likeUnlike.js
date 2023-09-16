import axios from "axios";
const URL = import.meta.env.VITE_APP_AUTH_BASE_URL;

const likeUnlike = async (id, token) => {
  try {
    await axios.post(`${URL}/api/likes/${id}/`, null, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  } catch (error) {
    console.log(error.response);
  }
};

export default likeUnlike;
