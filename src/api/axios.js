import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
});

instance.interceptors.response.use(res => {
  return res;
});

instance.interceptors.response.use(res => {
  return res.data;
});

export default instance;