<template>
  <input
    v-bind="$attrs"
    class="field_wrapper__input"
    @input="$emit('input', $event.target.value)"
  />
</template>
<script>
export default {
  name: "VModalField",
};
</script>
<style lang="scss" scoped>
input.field_wrapper__input {
  margin: 0 auto;
  background: none;
  border: none;
  width: 98px;
  max-width: 170px;
  text-align: center;
  font-family: $--font-family;
  font-size: $--vmodal--input--font-size;
  outline: none;
  color: $--text-color-on-primary-light;

  &::placeholder {
    color: $--placeholder-color;
  }

  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    appearance: none;
  }
}
</style>
