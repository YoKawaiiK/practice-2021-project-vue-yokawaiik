<template>
  <v-modal :show="show" @close="close" @give-data="giveData">
    <template v-slot:header-title-text>
      <span>Добавить данные</span>
    </template>

    <template v-slot:modal-main>
      <v-modal-radio-buttons-categories
        v-model="dataModal.categoryType"
        :options="radioButtonsCategories"
      />
      <div class="main_fields_wrapper">
        <v-modal-field
          v-model="dataModal.name"
          type="text"
          placeholder="Категория"
        ></v-modal-field>
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
import VModalRadioButtonsCategories from "./VModalRadioButtonsCategories.vue";

import { resetObjectValues } from "@/utils/index";

export default {
  name: "TheModalCategoriesTable",
  components: { VModal, VModalField, VModalRadioButtonsCategories },
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
      default: Object,
    },
  },
  data() {
    return {
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
      dataModal: {
        categoryType: "",
        name: "",
      },
    };
  },
  methods: {
    // give data in fields to paren
    // only insert
    giveData() {
      this.$emit("click", this.dataModal);
    },
    close() {
      resetObjectValues(this.dataModal);
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
