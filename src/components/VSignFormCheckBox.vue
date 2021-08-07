<template>
  <div class="checkbox">
    <label class="checkbox__label">
      <input
        class="label__input"
        type="checkbox"
        v-bind="$attrs"
        @change="$emit('change', $event.target.checked)"
      />
      <span class="label__text" :class="{ 'has-error': hasError }">
        <slot>{{ label }}</slot></span
      >
    </label>
  </div>
</template>
<script>
export default {
  name: "VSignFormCheckBox",
  model: {
    prop: "checked",
    event: "change",
  },
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array,
      default: new Array(),
    },
  },
  computed: {
    hasError() {
      if (this.required && this.errors.length > 0) return true;
      return false;
    },
  },
};
</script>
<style lang="scss" scoped>
.checkbox {
  label {
    input[type="checkbox"] {
      position: absolute;
      opacity: 0;

      &:focus + span::before {
        box-shadow: 0 0 0 1px $--color-primary-focus;
      }
    }

    .label__text {
      color: $--color-primary;

      position: relative;
      display: inline-block;
      padding-left: calc(18px + 6px + 16px);
      font-family: $--font-family;
      font-style: normal;
      font-weight: $--font-weight-normal;
      font-size: $--font-size-base;

      &::before,
      &::after {
        position: absolute;
      }

      &::before {
        height: 18px;
        width: 18px;
        content: "";
        left: 0px;
        border-radius: 3px;
        border: 1.5px solid $--input-border-color;
      }

      &::after {
        height: 6px;
        width: 10px;
        box-sizing: border-box;
        border-left: 2px solid;
        border-bottom: 2px solid;
        transform: rotate(-50deg);
        left: calc(18px / 3);
        top: calc(18px / 3);
        color: $--color-primary-focus;
      }
    }
    .has-error {
      color: $--color-danger-hard;
    }

    input[type="checkbox"]:checked + span::after {
      content: "";
    }
  }
}
</style>
