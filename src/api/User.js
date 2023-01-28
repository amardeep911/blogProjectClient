import axios from "axios";
axios.defaults.withCredentials = true;
export const getUser = async () => {
  const { data } = await axios.get("http://localhost:8080/api/user");
  return data;
};
