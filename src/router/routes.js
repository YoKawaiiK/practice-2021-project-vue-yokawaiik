// web-pages
import Auth from "@/views/auth/Auth.vue";
import SignIn from "@/views/auth/child/SignIn.vue";
import SignUp from "@/views/auth/child/SignUp.vue";
import Dashboard from "@/views/Dashboard.vue";

// routes names
import { AUTH, SIGN_IN, SIGN_UP, DASHBOARD } from "./constants/routesNames";

// middleware for guarding routes
import auth from "./middleware/auth";
import guest from "./middleware/guest";

export default [
  {
    path: "/auth",
    redirect: "/auth/signin",
    name: AUTH,
    component: Auth,
    children: [
      {
        path: "sign-in",
        name: SIGN_IN,
        component: SignIn,
        meta: {
          title: "Аутентификация",
          middleware: [guest],
        },
      },
      {
        path: "sign-up",
        name: SIGN_UP,
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
    name: DASHBOARD,
    component: Dashboard,
    meta: {
      title: "Dashboard",
      middleware: [auth],
    },
  },
  // link default page if user go to unknown path in url
  {
    path: "*",
    redirect: "/auth/sign-in",
  },
];
