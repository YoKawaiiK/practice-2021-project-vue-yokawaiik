<template>
  <button v-bind="$attrs" class="button" v-on="$listeners">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "VButton",
  props: {
    type: {
      type: String,
      default: "button",
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  width: 100%;
  border-color: transparent;
  border-radius: 5px;
  background: $--color-primary;
  text-align: center;
  padding: 10px 0px;
  font-family: $--font-family;
  font-style: normal;
  font-weight: $--font-weight-medium;
  font-size: $--font-size-base;
  letter-spacing: 0.4px;

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

.button__link {
  color: $--color-primary;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  font-family: $--font-family;
  background: transparent;
  border-color: transparent;

  &:hover {
    color: $--color-primary-light;
    text-decoration: underline;
  }

  &:active {
    color: $--text-color-on-primary-light;
  }

  &:focus {
    color: 0 0 0 1px $--shadow-color;
    text-decoration: underline;
  }
}
</style>
