<template>
  <div class="transactions">
    <the-v-modal-transactions-table
      :show="modal.show"
      :mode="modal.mode"
      :fields-data="modal.fieldsData"
      @close="clickShowModal"
      @click="transactionHandler"
    />
    <table class="transactions__transactions_table">
      <thead>
        <tr>
          <th>ДАТА</th>
          <th>КАТЕГОРИЯ</th>
          <th>СУММА</th>
          <th>
            <v-add-button-icon
              text="Add data"
              @click.prevent="clickShowModal"
            />
          </th>
        </tr>
      </thead>
      <tbody @scroll.passive="scrollTable">
        <tr
          v-for="(item, index) in getTransactionList"
          :key="index"
          :class="{ income: item.category.categoryType === 'income' }"
        >
          <td class="text_bold">{{ item.transactionDate }}</td>
          <td>{{ item.category.name }}</td>
          <td class="text_bold">{{ item.amount }}</td>
          <td class="buttons_icons">
            <button
              class="buttons_icons__button_item"
              @click.prevent="clickShowModalEdit(item)"
            >
              <svg class="button_item__icon icon__icon_edit">
                <use xlink:href="@/assets/icons/edit.svg#edit" />
              </svg>
            </button>
            <button
              class="buttons_icons__button_item"
              @click.prevent="clickDeleteTransaction(item.id)"
            >
              <svg class="button_item__icon icon__icon_remove">
                <use xlink:href="@/assets/icons/remove.svg#remove" />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import VAddButtonIcon from "@/components/VAddButtonIcon";
import TheVModalTransactionsTable from "@/components/TheVModalTransactionsTable";

import { mapGetters, mapActions } from "vuex";
import {
  TRANSACTIONS,
  GET_TRANSACTIONS_LIST,
  TRANSACTION_CREATE,
  TRANSACTION_UPDATE,
  TRANSACTION_DELETE,
  TRANSACTIONS_LIST,
} from "@/store/modules/transactions/constants/names";

export default {
  name: "TheTransactionsTable",
  components: { TheVModalTransactionsTable, VAddButtonIcon },
  data() {
    return {
      modal: {
        // for insert and edit
        show: false,
        mode: "",
        // for edit
        fieldsData: {},
      },
    };
  },
  computed: {
    ...mapGetters(TRANSACTIONS, { getTransactionList: GET_TRANSACTIONS_LIST }),
  },
  mounted() {
    this[TRANSACTIONS_LIST]();
  },
  methods: {
    ...mapActions(TRANSACTIONS, [
      TRANSACTION_CREATE,
      TRANSACTIONS_LIST,
      TRANSACTION_UPDATE,
      TRANSACTION_DELETE,
    ]),
    clickShowModal() {
      this.modal.fieldsData = {};
      this.modal.mode = "insert";
      this.modal.show = !this.modal.show;
    },
    clickShowModalEdit(item) {
      this.modal.mode = "edit";
      this.modal.fieldsData = item;
      this.modal.show = !this.modal.show;
    },
    async transactionHandler(data) {
      try {
        // if edit
        if (data.id) {
          await this[TRANSACTION_UPDATE](data);
        }
        // default insert
        else {
          await this[TRANSACTION_CREATE](data);
        }
      } catch (error) {
        this.$toast.show(...error[Object.keys(error)[0]], "warning");
      }
    },
    async clickDeleteTransaction(id) {
      try {
        await this[TRANSACTION_DELETE](id);
        this.$toast.show("Элемент удален", "success");
      } catch (error) {
        this.$toast.show(...error[Object.keys(error)[0]], "warning");
      }
    },
    scrollTable({ target: { scrollTop, clientHeight, scrollHeight } }) {
      if (scrollTop + clientHeight >= scrollHeight) {
        this[TRANSACTIONS_LIST]();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.transactions {
  height: 456px;
  width: 543px;
  background: #f8f9fd;
  overflow: hidden;
  border-radius: 6px;
}

table.transactions__transactions_table {
  border-collapse: collapse;
  width: 100%;
  font-family: Montserrat;
  font-style: normal;
  display: block;
  > thead {
    height: 37px;
    background: #f3f2f7;
    border-bottom: 1px solid #e9ecef;
    position: relative;
    display: block;
    width: 100%;
    > tr {
      font-size: 12px;
      color: #5e5873;
      text-align: left;
      width: calc(100% - 13px);
      height: 100%;
      display: flex;
      align-items: center;
      > th {
        padding: 0;
        padding-left: 32px;
        display: block;
        flex-basis: 100%;
      }
    }
  }
  > tbody {
    height: 419px;
    overflow: auto;
    display: block;
    position: relative;
    width: 100%;
    overflow-y: scroll;

    // scrollbar
    // Firefox
    scrollbar-width: auto;
    scrollbar-color: #5d5fef #ebe9f1;
    // Chrome, Edge, and Safari
    &::-webkit-scrollbar {
      width: 13px;
    }
    &::-webkit-scrollbar-track {
      background: #ebe9f1;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #5d5fef;
      border-radius: 3px;
    }

    mask-image: linear-gradient(
      to bottom,
      $--the-category--tbody--linear-gradient 85%,
      transparent 100%
    );

    > tr {
      height: 59px;
      background: transparent;
      color: #6e6b7b;
      font-size: 14px;
      border-bottom: 1px solid #e9ecef;
      width: 100%;
      display: flex;
      align-items: center;

      // green color for row expense
      &.income {
        color: $--the-category--text-expense-color;
      }

      &:last-child {
        border-bottom: none;
      }
      > td {
        padding: 0;
        padding-left: 32px;
        flex-basis: 100%;
        display: block;
        &.text_bold {
          font-weight: 600;
          font-size: 14px;
        }
        &.buttons_icons {
          display: flex;
          align-items: center;
          gap: 30px;
          height: 59px;
          button.buttons_icons__button_item {
            height: 24px;
            width: 24px;
            border: none;
            background-color: transparent;
            padding: 0;
            margin: 0;
            cursor: pointer;
            svg.button_item__icon {
              height: 24px;
              width: 24px;
            }
            .icon__icon_edit {
              color: #6e6b7b;
              &:hover {
                color: $--color-primary-light;
              }
              &:active {
                color: #5d5fef;
              }
            }

            .icon__icon_remove {
              color: #eb5757;
              &:hover {
                color: pink;
              }
              &:hover {
                color: $--color-primary-light;
              }
              &:active {
                color: #5d5fef;
              }
            }
          }
        }
      }
    }
  }
}
</style>
