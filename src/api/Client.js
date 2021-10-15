import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import { clearCache, getCachedData } from "../core/LocalStorageManager";

export const BASE_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "https://api.cbex.ir"
    : "";

export const METHOD = {
  GET: "get",
  HEAD: "HEAD",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
  POST: "POST",
};

const singleton = Symbol();
const singletonEnforcer = Symbol();

const defaultOptions = {
  baseURL: BASE_URL,
  method: METHOD.GET,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  },
};

class ApiService {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error("Cannot construct singleton");
    }
    const defaultOptions = {
      baseURL: BASE_URL,
      method: METHOD.GET,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
      },
    };

    this.session = axios.create(defaultOptions);
    this.session.interceptors.request.use((config) => {
      const token = getCachedData("access_token");
      if (!!token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      // if (config.data?.captcha) {
      //   config.headers["captcha-response"] = config.data?.captcha;
      //   delete config.data?.captcha;
      // }
      config.params = Object.assign({}, config.params || {});
      return config;
    });

    this.session.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          clearCache();
        }
        // handle the response error
        return Promise.reject(error?.response?.data);
      }
    );
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new ApiService(singletonEnforcer);
    }

    return this[singleton];
  }

  get = (url, options = {}) =>
    trackPromise(this.session.get(url, { ...defaultOptions, ...options }));
  post = (url, data, options = {}) =>
    trackPromise(
      this.session.post(url, data, { ...defaultOptions, ...options })
    );
  put = (url, data, options = {}) =>
    trackPromise(
      this.session.put(url, data, { ...defaultOptions, ...options })
    );
  patch = (url, data, options = {}) =>
    trackPromise(
      this.session.patch(url, data, { ...defaultOptions, ...options })
    );
  delete = (url, options = {}) =>
    trackPromise(this.session.delete(url, { ...defaultOptions, ...options }));
  remove = (...params) => this.session.delete(...params);
}

export default ApiService.instance;
