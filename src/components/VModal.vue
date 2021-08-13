<template>
  <div v-show="show" class="modal_window" @click="close">
    <div class="modal_window__modal_content" @click.stop>
      <header class="modal_window__header">
        <div class="header__close_button" tabindex="0" @click="close">
          &#xd7;
        </div>
        <div class="header__header_title">
          <span v-if="typeOperation === 'widget'">Имя виджета</span>
          <span v-else>Добавить данные</span>
        </div>
      </header>

      <main class="modal_window__main">
        <div v-if="typeOperation !== 'widget' && mode === 'insert'">
          <div class="main__main_radio_group">
            <div class="main_radio_group__radio_button">
              <label class="radio_button__button">
                <input
                  v-model="categoryType"
                  type="radio"
                  name="category_type"
                  value="income"
                />
                <span>Расходы</span>
              </label>
            </div>
            <div class="main_radio_group__radio_button">
              <label class="radio_button__button">
                <input
                  v-model="categoryType"
                  type="radio"
                  name="category_type"
                  value="expense"
                />
                <span>Доходы</span>
              </label>
            </div>
          </div>
        </div>

        <div v-if="typeOperation === 'category'" class="main__fields">
          <v-modal-field
            v-model="categoryData.name"
            type="text"
            placeholder="Категория"
          ></v-modal-field>
        </div>

        <div v-else-if="typeOperation === 'data'" class="main__fields">
          <v-modal-field type="text" placeholder="Дата"></v-modal-field>
          <hr />
          <v-modal-field type="text" placeholder="Категория"></v-modal-field>
          <hr />
          <v-modal-field type="text" placeholder="Сумма"></v-modal-field>
        </div>

        <div v-else>
          <div class="main__main_widget_group">
            <v-modal-select
              v-model="widgetData.category"
              :placeholder="widgetsData.category.placeholder"
              :select-data="widgetsData.category.data"
            ></v-modal-select>
            <hr />
            <v-modal-field
              v-model.number="widgetsData.limit.data"
              type="number"
              :placeholder="widgetsData.limit.placeholder"
            ></v-modal-field>
            <hr />
            <v-modal-select
              v-model="widgetData.date"
              :select-data="widgetsData.date.data"
              :placeholder="widgetsData.date.placeholder"
            ></v-modal-select>
          </div>

          <div class="main__conditon_radio">
            <div class="conditon_radio__condition_button">
              <label class="condition_button__radio_button">
                <input type="radio" name="conditon" />
                <span>Больше</span>
              </label>
            </div>
            <hr />
            <div class="conditon_radio__condition_button">
              <label class="condition_button__radio_button">
                <input type="radio" name="conditon" />
                <span>Меньше</span>
              </label>
            </div>
          </div>
        </div>
      </main>
      <footer class="modal_window__footer">
        <button class="footer__footer_button" @click="giveData">
          <span v-if="mode === 'insert'">Добавить</span>
          <span v-else>Сохранить</span>
        </button>
      </footer>
    </div>
  </div>
</template>
<script>
import VModalSelect from "./VModalSelect.vue";
import VModalField from "./VModalField.vue";

import { resetObjectValues } from "@/utils/index";
export default {
  name: "VModal",
  components: { VModalSelect, VModalField },
  props: {
    // edit / insert
    mode: {
      type: String,
      default: "insert",
    },
    // category / data (income, costs) / widget
    typeOperation: {
      type: String,
      default: "category",
    },
    fieldsData: {
      type: Object,
      default: Object,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // because this property in type Opeartion "data" and "category"
      categoryType: "",
      // category
      categoryData: {
        name: "",
      },
      // widgets. This code i change in future, when will be task for widgets
      widgetData: {
        category: "",
        limit: "",
        date: "",
      },
      // widgets data for template in selects/input.
      // This code i change in future, when will be task for widgets
      widgetsData: {
        category: {
          placeholder: "Категория",
          data: ["car", "food"],
        },
        date: {
          placeholder: "Срок",
          data: ["month"],
        },
        limit: {
          placeholder: "Лимит",
          data: "",
        },
      },
      //
    };
  },
  methods: {
    // give data in fields to parent
    giveData() {
      let data = {};
      // logic for feature/#3 only
      if (this.typeOperation === "category") {
        if (this.mode === "insert") data.categoryType = this.categoryType;
        data = { ...data, ...this.categoryData };
      }
      this.$emit("click", data);
    },
    // reset values in data
    close() {
      this.categoryType = "";
      resetObjectValues(this.categoryData);
      this.$emit("close");
    },
  },
};
</script>
<style lang="scss" scoped>
hr {
  background-color: $--vmodal--field-wrapper-border-color;
  border: none;
  width: 1px;
  height: 50px;
}
.modal_window {
  position: absolute;

  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  .modal_window__modal_content {
    z-index: 100;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    width: 469px;
    background: $--background-color;
    box-shadow: 10px 27px 42px $--vmodal--shadow-color;
    border-radius: 12px;

    .modal_window__header {
      padding-top: 31px;
      .header__header_title {
        text-align: center;
        display: block;

        color: $--text-color-on-primary-light;
        font-family: $--font-family;
        font-weight: $--font-weight-bold;
        font-size: $--vmodal--header-title--font-size;
      }
      .header__close_button {
        position: absolute;
        display: block;
        right: 10px;
        top: 12px;

        height: 18px;
        width: 18px;
        font-weight: $--font-weight-medium;
        line-height: 18px;
        border: 3px solid $--vmodal--close-button--color;
        color: $--vmodal--close-button--color;
        border-radius: 4px;
        font-size: $--vmodal--close-button--font-size;
        text-align: center;

        transition: all 0.2s;
        cursor: pointer;
        &:focus {
          color: $--color-primary-focus;
          border-color: $--color-primary-focus;
        }
        &:hover {
          border-color: $--color-primary-light;
          color: $--color-primary-light;
        }

        &:active {
          color: $--color-primary;
          border-color: $--color-primary;
        }
      }
    }
    .modal_window__main {
      width: 100%;

      .main__main_widget_group {
        margin: 32px 31px 0px;
        display: flex;
        align-content: space-around;

        > :nth-child(n) {
          margin: auto;
        }
      }

      .main__main_radio_group {
        margin-top: 29px;
        display: flex;
        justify-content: center;

        .main_radio_group__radio_button {
          font-size: $--vmodal--radio-button--font-size;
          font-family: $--font-family;
          font-weight: $--font-weight-bold;

          &:not(:first-child) {
            margin-left: 40px;
          }

          input[type="radio"] {
            display: none;
            position: absolute;
          }

          input[type="radio"]:checked + span {
            background: $--color-primary;
            color: $--text-color-on-primary;
          }

          input[type="radio"]:disabled + span {
            background: $--color-primary-disabled;
            color: $--text-color-on-primary-light;
          }

          label {
            display: flex;
            cursor: pointer;
            border-radius: 6px;
            user-select: none;
            text-align: center;

            span {
              margin: auto;
              height: 100%;
              width: 100%;
              padding: 6px 8px;
              background: $--color-primary-disabled;
              border-radius: 6px;
              transition: all 0.2s;

              &:hover {
                color: $--text-color-on-primary-light;
                background: $--color-primary-light;
              }
            }
          }
        }
      }

      .main__conditon_radio {
        border-top: 1px solid $--vmodal--field-wrapper-border-color;
        margin-top: 11px;
        display: flex;
        justify-content: space-around;

        .conditon_radio__condition_button {
          font-size: $--vmodal--conditon-button--font-size;
          font-family: $--font-family;
          width: 50%;

          input[type="radio"] {
            display: none;
            position: absolute;
          }

          input[type="radio"]:checked + span {
            color: $--label-text-color;
            font-weight: $--font-weight-bold;
          }

          label {
            height: 100%;
            display: flex;
            cursor: pointer;
            border-radius: 6px;
            user-select: none;
            text-align: center;

            span {
              margin: auto;
              padding: 6px 8px;
              border-radius: 6px;
              transition: all 0.2s;
              /* Hover */
              &:hover {
                color: $--text-color-on-primary-light;
              }
            }
          }
        }
      }
      .main__fields {
        display: flex;
        justify-content: space-around;
        margin: 33px 30px 0px;
      }
    }

    .modal_window__footer {
      margin: 18px 0px 0px;
      .footer__footer_button {
        background: $--color-primary;
        border-radius: 0px 0px 12px 12px;
        border-color: transparent;
        width: 100%;

        font-family: $--font-family;
        font-style: normal;
        font-weight: $--font-weight-bold;
        font-size: $--vmodal--footer-button--font-size;
        height: 53px;
        color: $--text-color-on-primary;
        transition: all 0.2s;
        cursor: pointer;
        outline: none;

        @mixin button-highligth {
          color: $--text-color-on-primary-light;
          background-color: $--color-primary-light;
        }

        &:focus {
          box-shadow: 0 0 0 1px $--shadow-color;
          @include button-highligth;
        }

        &:hover {
          @include button-highligth;
        }

        &:active {
          margin: 1px 1px 0;
          box-shadow: -1px -1px 1px $--shadow-color-active;
        }
      }
    }
  }
}
</style>
