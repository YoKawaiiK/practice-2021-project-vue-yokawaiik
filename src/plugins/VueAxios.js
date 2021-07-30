import axios from "axios";

// configuration
let option = {
  baseURL: "http://89.108.102.170/api/",
};
// instance for vuex
const $axios = axios.create(option);

// export for vuex
export const VuexAxios = function (store) {
  store.$axios = $axios;
};
// export for vue
export default {
  install(vue) {
    // vue.prototype.$axios = axios;
    vue.prototype.$axios = $axios;
  },
};
