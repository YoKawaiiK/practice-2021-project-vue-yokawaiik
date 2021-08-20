<template>
  <v-modal :show="show" @close="close" @give-data="giveData">
    <template v-slot:header-title-text>
      <span>Добавить данные</span>
    </template>

    <template v-slot:modal-main>
      <v-modal-radio-buttons-categories
        v-if="mode === 'insert'"
        v-model="categoryType"
        :options="radioButtonsCategories"
      />
      <div class="main_fields_wrapper">
        <div v-for="(item, index) of transactionsFields" :key="index">
          <v-modal-field
            v-if="item.type === 'text'"
            v-model="item.value"
            :type="item.text"
            :placeholder="item.placeholder"
          ></v-modal-field>
          <v-modal-select
            v-else
            v-model="item.value"
            :placeholder="item.placeholder"
            :select-data="getCategoriesList"
            :category-type="categoryType"
            :mode="mode"
          ></v-modal-select>
        </div>
      </div>
    </template>

    <template v-slot:footer-button-text>
      <span v-if="mode === 'insert'">Добавить</span>
      <span v-else>Сохранить</span>
    </template>
  </v-modal>
</template>
<script>
import VModal from "./VModal.vue";
import VModalField from "./VModalField.vue";
import VModalSelect from "./VModalSelect.vue";
import VModalRadioButtonsCategories from "./VModalRadioButtonsCategories.vue";

import { mapGetters } from "vuex";
import {
  CATEGORIES,
  GET_CATEGORIES_LIST,
} from "@/store/modules/categories/constants/names";

import {
  modalWindowCollectorData,
  fillModalWindowForEdit,
} from "@/utils/index";

export default {
  name: "TheVModalTransactionsTable",
  components: {
    VModal,
    VModalField,
    VModalSelect,
    VModalRadioButtonsCategories,
  },
  props: {
    // insert / edit
    mode: {
      type: String,
      default: "insert",
    },
    show: {
      type: Boolean,
      default: false,
    },
    // for edit
    fieldsData: {
      type: Object,
      default: new Object(),
    },
  },
  data() {
    return {
      transactionsFields: {
        transactionDate: {
          placeholder: "Дата",
          type: "text",
          value: "",
        },
        category: {
          placeholder: "Категория",
          type: "select",
          value: "",
        },
        amount: {
          placeholder: "Сумма",
          type: "text",
          value: "",
        },
      },
      radioButtonsCategories: [
        {
          text: "Расходы",
          name: "category_type",
          value: "expense",
        },
        {
          text: "Доходы",
          name: "category_type",
          value: "income",
        },
      ],
      categoryType: "",
    };
  },
  computed: {
    ...mapGetters(CATEGORIES, { getCategoriesList: GET_CATEGORIES_LIST }),
  },
  watch: {
    show() {
      if (this.fieldsData.id && this.show) {
        fillModalWindowForEdit(this.transactionsFields, this.fieldsData);
        this.categoryType = this.fieldsData.category.categoryType;
      }
    },
  },
  methods: {
    // give data in fields to parent
    giveData() {
      let data = {
        categoryType: this.categoryType,
        ...modalWindowCollectorData(this.transactionsFields, ["value"]),
      };

      if (this.mode === "edit") data = { ...data, id: this.fieldsData.id };

      this.$emit("click", data);
    },
    close() {
      this.transactionsFields.transactionDate.value = "";
      this.transactionsFields.category.value = "";
      this.transactionsFields.amount.value = "";
      this.categoryType = "";
      this.$emit("close");
    },
  },
};
</script>
<style lang="scss" scoped>
.main_fields_wrapper {
  display: flex;
  justify-content: space-around;
  margin: 33px 30px 0px;
}
</style>
