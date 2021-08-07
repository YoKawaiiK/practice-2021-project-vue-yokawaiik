import { ROUTE_DASHBOARD } from "@/router/constants/routesNames";
import { AUTH, GET_TOKENS } from "@/store/modules/auth/constants/names";

export default function guest({ next, store }) {
  if (store.getters[`${AUTH}/${GET_TOKENS}`]) {
    return next({
      name: ROUTE_DASHBOARD,
    });
  }
  return next();
}
