import axios from "axios";

export const VuexAxios = axios;

export default {
  install(vue) {
    vue.prototype.$axios = axios;
  },
};
