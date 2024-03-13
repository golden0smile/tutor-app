import axios from "axios";
import React from "react";

import { getBrowserName, getOSName } from "utils/getDeviceInfo";
import Cookies, { cookieKeys } from "./cookies";
import LocalStorage from "./localStorage";
import SessionStorage from "./sessionStorage";
import isDev from "utils/isDev";
import { toast } from "react-toastify";
//  https://api.mygooroo.io
// https://api.dev.mygooroo.io
// http://192.168.1.139:8089 //nirnjan bhai

//http://192.168.1.133:8089 //deep
//http://192.168.1.92:8089 //mihir
const baseUrl = isDev("http://192.168.1.92:8089", process.env.REACT_APP_API);
// const baseUrl =process.env.REACT_APP_API;
export const TUTOR_API_URL = `${baseUrl}/api/v1/tutor`;
export const STUDENT_API_URL = `${baseUrl}/api/v1/student`;
export const PARENT_API_URL = `${baseUrl}/api/v1/parent`;
export const API_URL = `${baseUrl}/api/v1`;

class Axios {
  constructor(baseURL) {
    this.axios = axios.create({
      baseURL,
    });

    this.axios.interceptors.request.use(this._requestMiddleware);

    this.axios.interceptors.response.use(
      this._responseMiddleware,
      this._responseErr,
    );
  }

  _requestMiddleware = req => {
    // Send Auth token on every request
    const token = Cookies.get(cookieKeys.TOKEN);
    if (!!token) req.headers.Authorization = "Bearer " + token;
    req.headers.type = 1;
    req.headers.version = React.version;
    req.headers.model = getBrowserName();
    req.headers.os = getOSName();
    return req;
  };

  _responseMiddleware = response => {
    //  Do something on every success full response
    return response;
  };

  _responseErr = error => {
    if (error?.response?.status === 401) {
      toast.error("Session expired. Please login again.");
      Cookies.clear();
      LocalStorage.clear();
      SessionStorage.clear();
      window.location.replace("/");
      return Promise.reject(error);

      // Logout / Redirect

      //Clear required local information
    }

    return Promise.reject(error);
  };
}

const axiosTutor = new Axios(TUTOR_API_URL).axios;
const axiosStudent = new Axios(STUDENT_API_URL).axios;
const axiosParent = new Axios(PARENT_API_URL).axios;
const axiosApi = new Axios(API_URL).axios;

export { axiosTutor, axiosApi, axiosStudent, axiosParent };
