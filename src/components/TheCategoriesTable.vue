<template>
  <div class="category">
    <the-v-modal-categories-table
      :show="showModal"
      @close="clickShowModal"
      @click="modalHandler"
    />
    <div class="category__category_header">
      <div class="category_header__header_item">
        <h2 class="header_item__title">Summary</h2>
      </div>
      <div class="category_header__header_item">
        <v-add-button-icon
          text="Add category"
          @click.prevent="clickShowModal"
        />
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
            :class="{ expense_green: item.categoryType === 'income' }"
          >
            <td>{{ item.name }}</td>
            <td>+999K</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
<script>
import TheVModalCategoriesTable from "@/components/TheVModalCategoriesTable";
import VAddButtonIcon from "@/components/VAddButtonIcon";

import { mapGetters, mapActions } from "vuex";
import {
  CATEGORY,
  CATEGORIES_LIST,
  GET_CATEGORIES_LIST,
  CATEGORY_CREATE,
} from "@/store/modules/category/constants/names";

// import { objectKeysCamelCaseToSnakeCase } from "@/utils/index";

export default {
  name: "TheCategoriesTable",
  components: { TheVModalCategoriesTable, VAddButtonIcon },
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
    async modalHandler(modalData) {
      try {
        await this[CATEGORY_CREATE](modalData);
      } catch (error) {
        this.$toast.show(...error[Object.keys(error)[0]], "danger");
      }
    },
    // open and close modal
    clickShowModal() {
      this.showModal = !this.showModal;
    },
  },
};
</script>
<style lang="scss" scoped>
.category {
  padding: 6px 26px 18px 27px;
  width: calc(303px - 27px - 6px);
  font-family: $--font-family;
  font-style: normal;
  box-shadow: 1px 8px 25px $--the-category--category--box-shadow;
  border-radius: 12px;
  .category__category_header {
    display: flex;
    gap: calc(50px + 17px);
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
    }
  }

  .category__table_section {
    margin-top: 21px;
    width: calc(248px + 20px);

    table {
      border-collapse: collapse;

      thead {
        display: table;
        width: 100%;
        table-layout: fixed;
        margin-bottom: 23px;
      }

      tbody {
        width: 100%;
        display: block;
        overflow: auto;
        height: 339px;
        mask-image: linear-gradient(
          to bottom,
          $--the-category--tbody--linear-gradient 85%,
          transparent 100%
        );

        /* hide scrollbar but allow scrolling */
        -ms-overflow-style: none; /* for Internet Explorer, Edge */
        scrollbar-width: none; /* for Firefox */
        &::-webkit-scrollbar {
          display: none; /* for Chrome, Safari, and Opera */
        }

        tr {
          width: 100%;
          display: table;
          table-layout: fixed;

          &:last-child {
            td {
              padding-bottom: 0px;
            }
          }

          &.expense_green {
            > td {
              color: $--the-category--text-expense-color;
            }
          }

          td {
            padding: 0 0px 11px 0px;
            &:first-child {
              border-right: 1px solid $--the-category--table--border-color;
            }
          }
        }
      }

      th,
      td {
        padding: 0;
        text-align: left;
        font-size: $--the-category--text--font-size;
        line-height: $--the-category--text--line-height;
        color: $--the-category--text-color;
        &:last-child {
          padding-left: 57px;
          padding-right: 5px;
        }
      }
    }
  }
}
</style>
