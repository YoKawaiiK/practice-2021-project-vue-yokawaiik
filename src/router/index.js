import Vue from "vue";
import VueRouter from "vue-router";

// file with routes
import routes from "./routes";

// file with handler for beforeEach
import handlerBeforeEach from "./handlers/handlerBeforeEach";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(handlerBeforeEach);

export default router;
