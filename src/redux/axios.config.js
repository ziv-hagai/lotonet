import axios from "axios";

axios.defaults.withCredentials = true;

export const baseURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL,
  data: {},
  withCredentials: true,
});

const axiosNoTokenInstance = axios.create({
  baseURL,
  data: {},
});

export { axiosInstance, axiosNoTokenInstance };
