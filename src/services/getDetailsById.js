import axios from "axios";
const URL = import.meta.env.VITE_APP_AUTH_BASE_URL;

const getDetailsById = async (id, token) => {
  try {
    const { data } = await axios.get(`${URL}/api/blogs/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default getDetailsById;
