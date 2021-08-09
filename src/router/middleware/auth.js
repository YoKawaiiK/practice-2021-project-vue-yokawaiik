import { ROUTE_SIGN_IN } from "@/router/constants/routesNames";
import { AUTH, GET_TOKENS } from "@/store/modules/auth/constants/names";

export default function auth({ next, store }) {
  if (!store.getters[`${AUTH}/${GET_TOKENS}`]) {
    return next({
      name: ROUTE_SIGN_IN,
    });
  }
  return next();
}
