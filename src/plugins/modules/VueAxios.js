import axios from "axios";

// instance global
export const $axios = axios.create();

// export for vuex vue global
export const VuexAxios = function (store) {
  store.$axios = $axios;
};

// export for vue global
export const VueAxios = {
  install(Vue) {
    // vue.prototype.$axios = axios;
    Vue.prototype.$axios = $axios;
  },
};
