<template>
  <button class="button_icon" v-on="$listeners">
    <svg class="button_icon__icon">
      <use xlink:href="@/assets/icons/plus-in-circle.svg#plusInCircle" />
    </svg>
    <span class="button_icon__text">{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: "VAddButtonIcon",
  props: {
    text: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.button_icon {
  padding: 0;
  display: flex;
  align-items: center;
  gap: 16px;
  color: $--the-category--button--color;
  border: none;
  background-color: transparent;
  height: 100%;

  font-size: $--the-category--button--font-size;
  font-family: Montserrat;
  font-style: normal;

  cursor: pointer;
  transition: all 0.2s;

  color: $--the-category--button--color;

  &:hover {
    color: $--color-primary-light;
  }
  &:active {
    color: #5d5fef;
  }
  &:focus {
    color: $--color-primary-focus;
  }
  svg.button_icon__icon {
    height: 24px;
    width: 24px;
  }
}
</style>
