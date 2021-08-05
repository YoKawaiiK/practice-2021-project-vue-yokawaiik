<template>
  <div class="field">
    <label class="field__label">
      <div class="label__top_item">
        <span class="top_item__label"> {{ label }} </span>
        <span class="help__button">
          <router-link v-if="routeName" :to="{ name: routeName }">{{
            helpText
          }}</router-link>
          <span v-else class="highlight">{{ helpText }}</span></span
        >
      </div>
      <input
        :name="name"
        :type="type"
        class="label__input"
        :placeholder="placeholder"
        @input="inputEvent"
      />
      <div v-if="required == true && errors.length > 0" class="label__errors">
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
  props: {
    id: {
      type: String,
      default: "input",
    },
    name: {
      type: String,
      default: "input",
    },
    type: {
      type: String,
      default: "input",
      required: true,
    },
    required: {
      type: Boolean,
      // default: false,
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
    routeName: {
      type: String,
      default: "",
    },
    errors: {
      type: Array,
      default: new Array(),
    },
  },
  methods: {
    inputEvent(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>
<style lang="scss" scope>
.field {
  width: 100%;
  width: 100%;
  border-radius: 5px;

  .field__label {
    .label__top_item {
      &:not(:nth-child(n + 2)) {
        display: flex;
        justify-content: space-between;
      }
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

        background: $--background-color none repeat scroll 0 0;
        background-size: 5;

        left: 16px;
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
