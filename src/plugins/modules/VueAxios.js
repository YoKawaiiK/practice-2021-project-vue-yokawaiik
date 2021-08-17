import axios from "axios";
import store from "@/store/index";

import {
  objectKeysCamelCaseToSnakeCase,
  objectKeysSnakeCaseToCamelCase,
} from "@/utils/index";

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
    config.data = objectKeysCamelCaseToSnakeCase(config.data);
    return setConfig(config);
  },
  async function (errorRequest) {
    throw errorRequest;
  }
);

$axios.interceptors.response.use(
  async function (response) {
    response.data = objectKeysSnakeCaseToCamelCase(response.data);
    return response;
  },
  async function (errorResponse) {
    try {
      // Return non auth error
      if (errorResponse.response.status === 401) {
        // refresh token if response bad request
        if (!(await store.dispatch(`${AUTH}/${REFRESH_TOKENS}`)))
          throw errorResponse;
        // set config and again request
        return setConfig(errorResponse.config);
      }
      // for other response error from server
      // (for example dublicated data, empty fields)
      throw errorResponse;
    } catch (error) {
      // error in try
      throw errorResponse;
    }
  }
);
