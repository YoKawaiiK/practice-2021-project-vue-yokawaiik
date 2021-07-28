// import Home from "../views/Home.vue";

import Authorization from "../views/Authorization.vue";
import Registration from "../views/Registration.vue";

export default [
  //   {
  //     path: "/",
  //     name: "Home",
  //     component: Home,
  //   },
  //   {
  //     path: "/about",
  //     name: "About",
  //     // route level code-splitting
  //     // this generates a separate chunk (about.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () =>
  //       import(/* webpackChunkName: "about" */ "../views/About.vue"),
  //   },
  {
    path: "/auth/signin",
    name: "Signin",
    component: Authorization,
  },
  {
    path: "/auth/signup",
    name: "Signup",
    component: Registration,
  },
];
