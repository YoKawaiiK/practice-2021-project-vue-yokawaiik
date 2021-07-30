import $router from "../../router/index";

export default {
  namespaced: true,
  state: {
    // token get before signin
    token: undefined,
    // data for show in profile
    username: "Hi Leo",
    email: "",
  },
  getters: {
    getToken(state) {
      return state.token;
    },
  },
  mutations: {
    SET_TOKEN(state, data) {
      state.token = data;
    },
    // SET_REFRESH_TOKEN(state) {
    //   state.token = data;
    // },
  },
  actions: {
    /** Signin account
     * @param {Object=} data - field data in form
     */
    async signin({ commit }, data) {
      try {
        let response = await this.$axios.post("/auth/token/obtain/", data);

        if (response.status == 200) {
          await commit("SET_TOKEN", response.data);
          $router.push({
            name: "Dashboard",
          });
        }

        // if dont account then go to signup
        // i maybe change it
      } catch (error) {
        alert("Такой пользователь не найден");
        $router.push({
          name: "Signup",
        });
      }
    },
  },
};
// this.$axios.get()
