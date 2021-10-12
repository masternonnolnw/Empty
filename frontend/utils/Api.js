import axios from "axios";

export const userLogin = async ({ username, password }) => {
  // console.log(username);
  // console.log(password);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const token = await axios.post(`${baseURL}/login`, { username, password });
  return token;
};
