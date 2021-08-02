import axios from "axios";

// configuration
let options = {
  baseURL: process.env.VUE_APP_BASE_URL,
};

// instance for vuex
export const $axios = axios.create(options);

// export for vuex
export const VuexAxios = function (store) {
  store.$axios = $axios;
};

// export for vue
export const VueAxios = {
  install(vue) {
    // vue.prototype.$axios = axios;
    vue.prototype.$axios = $axios;
  },
};
