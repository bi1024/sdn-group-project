import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/",
});

export { api };

export const headerConfig = (accessToken) => {
  let config = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  };
  
  return config;
};

const urlImage = "http://localhost/doan/laravel8/public/upload/";
export {urlImage}


