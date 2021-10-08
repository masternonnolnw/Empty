import axios from "axios";

export const userLogin = async ({ email, password }) => {
  // const baseURL = "http://localhost:3500";
  // const token = await axios.post(`${baseURL}/login`, { email, password });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "master" && password === "1234") {
        resolve();
      } else {
        reject();
      }
    }, 3000);
  });
};
