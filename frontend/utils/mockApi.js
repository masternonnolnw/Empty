import axios from "axios";

export const userLogin = async ({ username, password }) => {
  console.log(username);
  console.log(password);
  const baseURL = "https://mtmaster.herokuapp.com/";
  const token = await axios.post(`${baseURL}/login`, { username, password });
  return token;
};
