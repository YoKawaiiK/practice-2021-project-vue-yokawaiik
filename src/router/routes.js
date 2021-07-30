import Signin from "../views/Signin.vue";
import Signup from "../views/Signup.vue";
import Dashboard from "../views/Dashboard.vue";

export default [
  {
    path: "/auth/signin",
    name: "Signin",
    component: Signin,
    meta: {
      title: "Аутентификация",
      guest: true,
    },
  },
  {
    path: "/auth/signup",
    name: "Signup",
    component: Signup,
    meta: {
      title: "Регистрация",
      guest: true,
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      title: "Dashboard",
      requiresAuth: true,
    },
  },
  // link default page if user go to unknown path in url
  {
    path: "*",
    redirect: "/auth/signin",
  },
];
