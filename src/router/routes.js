// import Home from "../views/Home.vue";

import Signin from "../views/Signin.vue";
import Signup from "../views/Signup.vue";

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
    component: Signin,
  },
  {
    path: "/auth/signup",
    name: "Signup",
    component: Signup,
  },
];
