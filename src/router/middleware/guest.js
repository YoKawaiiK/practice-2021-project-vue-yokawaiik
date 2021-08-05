import { ROUTE_DASHBOARD } from "@/router/constants/routesNames";

export default function guest({ next, store }) {
  if (store.getters["auth/getToken"] !== undefined) {
    return next({
      name: ROUTE_DASHBOARD,
    });
  }
  return next();
}
