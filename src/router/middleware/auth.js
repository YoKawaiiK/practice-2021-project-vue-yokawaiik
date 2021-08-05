import { ROUTE_SIGN_IN } from "@/router/constants/routesNames";

export default function auth({ next, store }) {
  if (store.getters["auth/getToken"] === undefined) {
    // auth = store.getters["auth/getToken"].access;
    return next({
      name: ROUTE_SIGN_IN,
    });
  }
  return next();
}
