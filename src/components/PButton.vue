<template>
  <button class="button" @click.prevent="callback($event)">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "PButton",
  methods: {
    callback: function (e) {
      return this.$emit("click", e);
    },
  },
};
</script>

<style lang="scss">
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

  color: #ffffff;
  transition: all 0.2s;
  cursor: pointer;
  outline: none;

  @mixin button-highligth {
    color: #414146;
    background-color: $--color-primary-light;
  }

  &:focus {
    box-shadow: 0 0 0 1px rgba(163, 162, 168, 0.6);

    @include button-highligth;
  }

  &:hover {
    @include button-highligth;
  }

  &:active {
    margin: 1px 1px 0;
    box-shadow: -1px -1px 1px rgb(167, 167, 167);
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
    color: #414146;
  }

  &:focus {
    color: 0 0 0 1px rgba(163, 162, 168, 0.6);
    text-decoration: underline;
  }
}
</style>
