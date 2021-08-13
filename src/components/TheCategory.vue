<template>
  <div class="category">
    <v-modal
      :show="showModal"
      @close="showModal = !showModal"
      @click="categoryHandler"
    ></v-modal>
    <div class="category__category_header">
      <div class="category_header__header_item">
        <h2 class="header_item__title">Summary</h2>
      </div>
      <div class="category_header__header_item">
        <button class="header_item__button" @click="clickShowModal">
          <img
            class="button__icon"
            src="@/assets/icons/plus-in-circle.svg"
            alt="plus-in-circle"
          />
          <span class="button__text">Add category</span>
        </button>
      </div>
    </div>
    <section class="category__table_section">
      <table>
        <thead>
          <tr>
            <th>Расходы</th>
            <th>Сумма</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item of getCategoriesList"
            :key="item.id"
            :class="{ expense_green: item.category_type === 'income' }"
          >
            <td>{{ item.name }}</td>
            <td>+999999K</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
<script>
import VModal from "@/components/VModal";
import { mapGetters, mapActions } from "vuex";
import {
  CATEGORY,
  CATEGORIES_LIST,
  GET_CATEGORIES_LIST,
  CATEGORY_CREATE,
} from "@/store/modules/category/constants/names";

import { objectKeysToCamelCase } from "@/utils/index";

export default {
  name: "TheCategory",
  components: { VModal },
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    ...mapGetters(CATEGORY, { getCategoriesList: GET_CATEGORIES_LIST }),
  },
  created() {
    this[CATEGORIES_LIST]();
  },
  methods: {
    ...mapActions(CATEGORY, [CATEGORIES_LIST, CATEGORY_CREATE]),
    // feature/#3 only add item
    async categoryHandler(modalData) {
      let newCategoryData = objectKeysToCamelCase(modalData);
      const result = await this[CATEGORY_CREATE](newCategoryData);
      if (result != true) {
        return this.$toast.show(...result[Object.keys(result)[0]], "danger");
      }
    },
    clickShowModal() {
      this.showModal = !this.showModal;
    },
  },
};
</script>
<style lang="scss" scoped>
.category {
  padding: 6px calc(26px - 20px) 18px 27px;
  width: calc(303px - 27px - 6px);
  font-family: $--font-family;
  font-style: normal;
  box-shadow: 1px 8px 25px $--the-category--category--box-shadow;
  .category__category_header {
    display: flex;
    gap: 50px;
    .category_header__header_item {
      .header_item__title {
        display: flex;
        align-items: center;
        font-weight: $--font-weight-bold;
        font-size: $--the-category--title--font-size;
        line-height: $--the-category--text--line-height;
        height: 100%;
        margin: 0;
        color: $--the-category--text-color;
      }
      .header_item__button {
        // margin-left: 50px;
        padding: 0;
        display: flex;
        align-items: center;
        gap: 16px;
        color: $--the-category--button--color;

        border: none;
        background-color: transparent;
        height: 100%;

        font-size: $--the-category--button--font-size;
        cursor: pointer;
        transition: all 0.2s;
        &:focus {
          color: $--color-primary-focus;
        }

        &:active {
          color: $--text-color-on-primary-light;
        }

        &:hover {
          font-weight: $--font-weight-bold;
          color: $--color-primary;
        }
      }
    }
  }
  .category__table_section {
    margin-top: 21px;
    width: 248px;

    table {
      overflow: hidden;
      width: 100%;

      > thead {
        display: table;
        table-layout: fixed;
        margin-bottom: 23px;
        display: table;

        width: 100%;
        > tr {
          width: 100%;
          text-align: left;
          > th {
            padding: 0;
            font-size: $--the-category--text--font-size;
            line-height: $--the-category--text--line-height;
            color: $--the-category--text-color;
            flex: 1;

            &:last-child {
              padding-left: 57px;
            }
          }
        }
      }

      tbody {
        width: calc(100% + 20px);
        display: block;
        overflow: auto;
        height: 339px;
        mask-image: linear-gradient(
          to bottom,
          $--the-category--tbody--linear-gradient 85%,
          transparent 100%
        );
      }
      tr {
        width: 100%;
        td {
          width: 50%;
          font-size: $--the-category--text--font-size;
          line-height: $--the-category--text--line-height;
          padding: 0 0px 11px 0px;
          color: $--the-category--text-color;

          &:first-child {
            border-right: 1px solid $--the-category--table--border-color;
          }
          &:last-child {
            padding-left: 57px;
            padding-right: 0;
          }
        }
        &:last-child {
          td {
            padding-bottom: 0;
          }
        }
      }
      // green text for expense
      tr.expense_green {
        > td {
          color: $--the-category--text-expense-color;
        }
      }
    }
  }
}
</style>
