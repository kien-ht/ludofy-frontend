import axios from "axios";
import { GET_TOKEN } from "commons/helpers";

const baseService = axios.create({
  baseURL: "http://localhost:3333",
});

baseService.interceptors.request.use(
  function (req) {
    const token = GET_TOKEN();
    if (token) {
      req.headers.authorization = token;
    }
    return req;
  },
  function (error) {
    return Promise.reject(error);
  }
);

baseService.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default baseService;
