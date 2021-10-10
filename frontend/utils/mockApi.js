import axios from "axios";

export const userLogin = async ({ username, password }) => {
  console.log(username);
  console.log(password);
  const baseURL = "http://localhost:8000";
  const token = await axios.post(`${baseURL}/login`, { username, password });
  return token;
};
