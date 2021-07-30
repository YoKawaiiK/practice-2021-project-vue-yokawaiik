import store from "../store/index";

export default (to, from, next) => {
  // Если пользователь зашел
  let auth = undefined;
  if (store.getters["auth/getToken"] != undefined) {
    auth = store.getters["auth/getToken"].access;
  }

  // Если вход осуществлен, то закрыть маршруты входа и регистрации

  if (to.matched.some((route) => route.meta.guest)) {
    if (auth == undefined) {
      next();
    } else {
      next({ name: "Dashboard" });
    }
  } else if (to.matched.some((route) => route.meta.requiresAuth)) {
    // Если в куках нет jwt, то перенаправить на главную
    if (auth == undefined) {
      next({ name: "Signin" });
    }
    // Если найден, то разрешить перейти на маршрут
    else {
      next();
    }
  } else {
    next();
  }
  next();
};
