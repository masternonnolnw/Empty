import axios from "axios";

export const userLogin = async ({ username, password }) => {
  // const baseURL = "http://localhost:3500";
  // const token = await axios.post(`${baseURL}/login`, { email, password });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "master" && password === "1234") {
        resolve();
      } else {
        reject();
      }
    }, 3000);
  });
};
