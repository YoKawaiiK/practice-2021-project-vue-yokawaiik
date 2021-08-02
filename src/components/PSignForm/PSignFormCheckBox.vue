<template>
  <div class="checkbox">
    <input
      :id="id"
      type="checkbox"
      :checked="checked"
      @change="changeHandler"
    />
    <label :for="id">
      <slot>{{ label }}</slot></label
    >
  </div>
</template>
<script>
export default {
  name: "PSignFormCheckBox",
  model: {
    prop: "checked",
    event: "change",
  },
  props: {
    id: {
      type: String,
      default: "",
    },
    checked: {
      type: Boolean,
    },
    label: {
      type: String,
      default: "",
    },
  },
  methods: {
    changeHandler(e) {
      this.$emit("change", e.target.checked);
    },
  },
};
</script>
<style lang="scss">
.checkbox {
  input[type="checkbox"] {
    position: absolute;
    opacity: 0;

    :focus + label::before {
      box-shadow: 0 0 0 1px rgba(114, 103, 240, 0.6);
    }
  }

  label {
    color: #7367f0;
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
      content: "";
      display: inline-block;
    }

    &::before {
      height: 18px;
      width: 18px;

      left: 0px;
      border-radius: 3px;
      border: 1.5px solid #d8d6de;
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
      color: rgba(114, 103, 240);
    }

    input[type="checkbox"]:checked + label::after {
      content: "";
    }
  }
}
</style>
