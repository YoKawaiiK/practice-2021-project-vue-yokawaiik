import Vue from "vue";
import Vuex from "vuex";

// Here modules
import auth from "./modules/auth/auth";
import category from "./modules/category/category";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    auth,
    category,
  },
  strict: debug,
});
