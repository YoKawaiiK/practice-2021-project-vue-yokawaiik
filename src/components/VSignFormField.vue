<template>
  <div class="field">
    <label class="field__label">
      <div class="label__top_item">
        <span class="top_item__label"> {{ label }} </span>
        <span v-if="helpText" class="help__button">
          <span
            v-if="helpClick"
            class="highlight"
            @click="$emit('help-click')"
            >{{ helpText }}</span
          >
          <span v-else> </span>
        </span>
      </div>
      <!-- $attrs not working -->
      <input
        class="label__input"
        v-bind="$props"
        @input="$emit('input', $event.target.value)"
      />
      <div v-if="showError" class="label__errors">
        <span v-for="(item, i) of errors" :key="i" class="errors__error-item">
          {{ item }}</span
        >
      </div>
    </label>
  </div>
</template>

<script>
export default {
  name: "VSignFormField",
  emits: ["help-link"],
  props: {
    name: {
      type: String,
      default: "input",
    },
    type: {
      type: String,
      default: "text",
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    helpText: {
      type: String,
      default: "",
    },
    helpClick: {
      type: Function,
      // remove linter error, the function is called by the parent in parent
      default: new Function(),
    },
    routeName: {
      type: String,
      default: "",
    },
    errors: {
      type: Array,
      default: new Array(),
    },
  },
  computed: {
    showError() {
      return this.required == true && this.errors.length > 0;
    },
  },
};
</script>
<style lang="scss" scoped>
.field {
  width: 100%;
  width: 100%;
  border-radius: 5px;

  .field__label {
    .label__top_item {
      margin-bottom: 2px;
      display: flex;
      justify-content: space-between;

      .top_item__label {
        color: $--label-text-color;
        font-size: $--font-size-small;
      }
      .help__button {
        font-size: $--font-size-small;
      }
    }

    .label__errors {
      position: relative;

      font-size: $--font-size-small;
      font-weight: $--font-weight-medium;
      color: $--color-danger-hard;

      .errors__error-item {
        position: absolute;
        padding: 0px 2px;
        background: $--background-color;
        background-size: 5;

        left: 12px;
        top: -10px;
      }
    }
  }
  .label__input {
    width: 100%;
    height: 38px;

    font-family: $--font-family;
    font-style: normal;
    font-weight: $--font-weight-normal;
    font-size: $--font-size-base;

    padding: 0px 15px;
    border: 1px solid $--input-border-color;
    box-sizing: border-box;
    background: $--background-color;
    border-radius: 5px;
    color: $--label-text-color;

    outline: none;

    &::placeholder {
      color: $--placeholder-color;
    }

    &:focus {
      box-shadow: 0 0 0 1px $--color-primary-light;
    }
    &:-webkit-autofill {
      box-shadow: 0 0 0px 1000px $--background-color inset;
    }
  }

  label__top_item + label__input {
    margin-top: 2px;
  }
}
</style>
