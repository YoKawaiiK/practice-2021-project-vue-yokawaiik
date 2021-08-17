<template>
  <div class="radio_buttons">
    <div
      v-for="(button, index) in options"
      :key="index"
      class="radio_buttons__radio_button"
    >
      <label class="radio_button__button_wrapper">
        <input
          type="radio"
          :value="value"
          :checked="button.value == value"
          @change="$emit('input', button.value)"
        />
        <span>{{ button.text }}</span>
      </label>
    </div>
  </div>
</template>
<script>
export default {
  name: "VModalRadioButtonsCategories",
  props: {
    options: {
      type: Array,
      default: new Array(),
    },
    value: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
.radio_buttons {
  margin-top: 29px;
  display: flex;
  justify-content: center;
  // width: 100%;

  .radio_buttons__radio_button {
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
</style>
