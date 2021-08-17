import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/scss/main.scss";
import store from "./store/index";

// event bus use global vue
import { eventBus } from "@/utils/index";
Vue.prototype.$eventBus = eventBus;

// Global use plugins in vue components
import { ToastsPlugin } from "./plugins/index";
Vue.use(ToastsPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
