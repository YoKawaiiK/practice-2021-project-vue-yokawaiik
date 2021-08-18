import { TransactionsService } from "@/services/index";

import {
  GET_TRANSACTIONS_LIST,
  ADD,
  UPDATE,
  DELETE,
  ADD_TRANSACTIONS_LIST,
  SET_QUERY,
  TRANSACTION_CREATE,
  TRANSACTION_UPDATE,
  TRANSACTION_DELETE,
  TRANSACTIONS_LIST,
} from "./constants/names";

export default {
  namespaced: true,
  state: {
    transactionsList: [],
    query: {
      limit: 10,
      offset: 0,
      // useless now
      startDate: "",
      endDate: "",
    },
  },
  getters: {
    [GET_TRANSACTIONS_LIST](state) {
      return state.transactionsList;
    },
  },
  mutations: {
    // add to top
    [ADD](state, newTransaction) {
      state.transactionsList.unshift(newTransaction);
    },
    // update one element in transactionsList
    [UPDATE](state, newTransaction) {
      const item = state.transactionsList.find(
        (transaction) => transaction.id == newTransaction.id
      );
      Object.assign(item, newTransaction);
    },
    // update one element in transactionsList
    [DELETE](state, id) {
      const index = state.transactionsList.findIndex(
        (transaction) => transaction.id == id
      );
      state.transactionsList.splice(index, 1);
    },
    // add to bottom
    [ADD_TRANSACTIONS_LIST](state, partOfTransactionsList) {
      state.transactionsList.push(...partOfTransactionsList);
    },
    [SET_QUERY](state, newQuery) {
      for (const key in newQuery) {
        if (key in state.query) {
          state.query[key] = newQuery[key];
        }
      }
    },
  },
  actions: {
    async [TRANSACTION_CREATE]({ commit }, modalData) {
      try {
        const { data } = await TransactionsService.transactionCreate(modalData);
        if (data.id) await commit(ADD, data);
        return data;
      } catch (error) {
        throw error.response.data;
      }
    },
    async [TRANSACTION_UPDATE]({ commit }, modalData) {
      try {
        const { data } = await TransactionsService.transactionPartialUpdate(
          modalData
        );
        if (data.id) await commit(UPDATE, data);
        return data;
      } catch (error) {
        throw error.response.data;
      }
    },
    async [TRANSACTION_DELETE]({ commit }, id) {
      try {
        const { status } = await TransactionsService.transactionDelete(id);
        await commit(DELETE, id);
        return status;
      } catch (error) {
        throw error.response.data;
      }
    },
    async [TRANSACTIONS_LIST]({ state, commit }) {
      try {
        const { data } = await TransactionsService.transactionsList(
          state.query
        );
        const query = { offset: state.query.offset + state.query.limit };
        await commit(SET_QUERY, query);

        await commit(ADD_TRANSACTIONS_LIST, data.results);
        return data;
      } catch (error) {
        throw error.response.data;
      }
    },
  },
};
