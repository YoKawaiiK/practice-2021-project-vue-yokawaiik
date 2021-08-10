// web-pages
import Auth from "@/views/auth/Auth.vue";
import SignIn from "@/views/auth/child/SignIn.vue";
import SignUp from "@/views/auth/child/SignUp.vue";
import Dashboard from "@/views/Dashboard.vue";

import Testing from "@/views/Testing.vue";

// routes names
import {
  ROUTE_AUTH,
  ROUTE_SIGN_IN,
  ROUTE_SIGN_UP,
  ROUTE_DASHBOARD,
  ROUTE_TESTING,
} from "./constants/routesNames";

// middleware for guarding routes
import auth from "./middleware/auth";
import guest from "./middleware/guest";

export default [
  {
    path: "/auth",
    redirect: "/auth/signin",
    name: ROUTE_AUTH,
    component: Auth,
    children: [
      {
        path: "sign-in",
        name: ROUTE_SIGN_IN,
        component: SignIn,
        meta: {
          title: "Аутентификация",
          middleware: [guest],
        },
      },
      {
        path: "sign-up",
        name: ROUTE_SIGN_UP,
        component: SignUp,
        meta: {
          title: "Регистрация",
          middleware: [guest],
        },
      },
    ],
  },
  {
    path: "/dashboard",
    name: ROUTE_DASHBOARD,
    component: Dashboard,
    meta: {
      title: "Dashboard",
      middleware: [auth],
    },
  },
  {
    path: "/testing",
    name: ROUTE_TESTING,
    component: Testing,
    meta: {
      title: "Testing",
    },
  },
  // link default page if user go to unknown path in url
  {
    path: "*",
    redirect: "/auth/sign-in",
  },
];
