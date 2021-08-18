import { CategoriesService } from "@/services/index";

import {
  ADD_CATEGORY,
  GET_CATEGORIES_LIST,
  SET_CATEGORIES_LIST,
  CATEGORIES_LIST,
  CATEGORY_CREATE,
} from "./constants/names";

export default {
  namespaced: true,
  state: {
    categoriesList: [],
  },
  getters: {
    [GET_CATEGORIES_LIST](state) {
      return state.categoriesList;
    },
  },
  mutations: {
    [SET_CATEGORIES_LIST](state, newCategoriesList) {
      state.categoriesList = newCategoriesList;
    },
    [ADD_CATEGORY](state, category) {
      state.categoriesList.unshift(category);
    },
  },
  actions: {
    async [CATEGORY_CREATE]({ commit }, modalData) {
      try {
        const { data } = await CategoriesService.categoryCreate(modalData);
        if (data.id) await commit(ADD_CATEGORY, data);
        return data;
      } catch (error) {
        throw error.response.data;
      }
    },
    async [CATEGORIES_LIST]({ commit }) {
      try {
        const { data } = await CategoriesService.categoriesList();
        await commit(SET_CATEGORIES_LIST, data);
        return data;
      } catch (error) {
        throw error.response.data.detail;
      }
    },
  },
};
