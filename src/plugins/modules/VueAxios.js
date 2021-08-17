import axios from "axios";
import store from "@/store/index";

import {
  AUTH,
  GET_TOKENS,
  REFRESH_TOKENS,
} from "@/store/modules/auth/constants/names";

// instance global
export const $axios = axios.create();

// check token in store and add to headers Authorization: Bearer Token
export const setConfig = (config) => {
  const token = store.getters[`${AUTH}/${GET_TOKENS}`];
  if (token) {
    config.headers.Authorization = `Bearer ${token.access}`;
  }
  return config;
};

$axios.interceptors.request.use(
  async function (config) {
    return setConfig(config);
  },
  async function (error) {
    throw new Error(error);
  }
);

$axios.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    // Return non auth error
    if (error.response.status === 401) {
      // refresh token if response bad request
      if (!(await store.dispatch(`${AUTH}/${REFRESH_TOKENS}`))) throw error;
      // set config and again request
      return setConfig(error.config);
    }

    throw error;
  }
);
