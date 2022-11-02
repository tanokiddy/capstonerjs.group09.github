import axios from "axios";
import { localServ } from "./localService";
import { store } from "../index";
import {
  loadingOffAction,
  loadingOnAction,
} from "../redux/actions/loadingAction";
export const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwNCIsIkhldEhhblN0cmluZyI6IjA1LzAzLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3Nzk3NDQwMDAwMCIsIm5iZiI6MTY1NDEwMjgwMCwiZXhwIjoxNjc4MTIyMDAwfQ.FunqYipkHrCbBATBzuJXyjGpZZxDekx1oY2qxW3_yfw";

//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMjUwMTk2IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3RyaW5nYWFhYWExMjE5ODQxMjg5IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlF1YW5UcmkiLCJzdHJpbmdhYWFhYTEyMTk4NDEyODkiLCJHUDAxIl0sIm5iZiI6MTY2NTQ0ODkzMSwiZXhwIjoxNjY1NDUyNTMxfQ.tc9EUQFMkFIWMc41pgNcs1fsxUrijqg-sqgwGZJDWRw
export const BASE_URL = "https://movienew.cybersoft.edu.vn";
// export const BASE_URL1 = "http://localhost:3000/";

export let https = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
    Authorization: "Bearer " + localServ.user.getDataUser()?.accessToken,
  },
});

// Add a request interceptor
https.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    store.dispatch(loadingOnAction());

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
https.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    store.dispatch(loadingOffAction());
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    store.dispatch(loadingOffAction());
    return Promise.reject(error);
  }
);
