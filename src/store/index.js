import Vue from "vue";
import Vuex from "vuex";

// Here modules
import auth from "./modules/auth/auth";
import categories from "./modules/categories/categories";
import transactions from "./modules/transactions/transactions";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    auth,
    categories,
    transactions,
  },
  strict: debug,
});
