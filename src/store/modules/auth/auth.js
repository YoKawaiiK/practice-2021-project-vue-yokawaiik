import { AuthService } from "@/services/index";
import { GET_TOKENS, SET_TOKENS, SIGN_IN } from "./constants/names";

export default {
  namespaced: true,
  state: {
    // token get before signin
    tokens: null,
    // data for show in profile
    username: "",
    email: "",
  },
  getters: {
    [GET_TOKENS](state) {
      return state.tokens;
    },
  },
  mutations: {
    [SET_TOKENS](state, data) {
      state.tokens = data;
    },
  },
  actions: {
    /** Signin account
     * @param {Object=} formData - field data in form
     */
    async [SIGN_IN]({ commit }, formData) {
      try {
        const { data } = await AuthService.signIn(formData);
        await commit(SET_TOKENS, data);
        return true;
      } catch (error) {
        return error.response.data.detail;
      }
    },
  },
};
