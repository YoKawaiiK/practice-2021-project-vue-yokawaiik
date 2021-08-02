import { DASHBOARD } from "@/router/constants/routesNames";

export default function guest({ next, store }) {
  if (store.getters["auth/getToken"] !== undefined) {
    return next({
      name: DASHBOARD,
    });
  }
  return next();
}
