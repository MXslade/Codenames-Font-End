import axios from "axios";
import { IUser } from "./interfaces";
import { jwtTokenKeyName } from "./constants";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem(jwtTokenKeyName);
  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("jwtToken");
  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthApi = {
  authenticate(email: string, password: string) {
    return axios.post("http://localhost:8080/auth", {
      email: email,
      password: password,
    });
  },

  register(user: IUser) {
    return instance.post("register", user);
  },

  getUserData() {
    return instance.get("user-data");
  },
};
