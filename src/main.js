import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/scss/main.scss";

import store from "./store/index";

// Global use axios in vue component
import VueAxios from "./plugins/VueAxios";
Vue.use(VueAxios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
