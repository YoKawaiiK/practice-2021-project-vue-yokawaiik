<template>
  <div class="field">
    <div class="field__top_item">
      <label for="password" class="top_item__label"> {{ label }} </label>
      <button
        v-if="helpText"
        class="top_item__help help__button"
        tabindex="0"
        type="link"
        @click.prevent="callback($event)"
      >
        {{ helpText }}
      </button>
    </div>
    <input
      :id="id"
      :name="name"
      :type="type"
      class="field__input"
      :placeholder="placeholder"
      @input="inputEvent"
    />
  </div>
</template>

<script>
export default {
  name: "PSignFormField",

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
      default(e) {
        return this.$emit("help-click", e);
      },
    },
  },
  methods: {
    inputEvent(e) {
      this.$emit("input", e.target.value);
    },
    callback: function (e) {
      return this.$emit("click", e);
    },
  },
};
</script>
<style lang="scss">
.field {
  width: 100%;
  border-radius: 5px;

  &__title {
    margin: 0;
  }

  &__subtitle {
    margin: 0;
    margin-top: 8px;
  }

  .field__top_item {
    &:not(:nth-child(n + 2)) {
      display: flex;
      justify-content: space-between;
    }

    .top_item__label {
      color: #6e6b7b;
      font-size: $--font-size-small;
    }

    .top_item__help {
      font-size: $--font-size-small;
    }

    .help__button {
      color: $--color-primary;
      cursor: pointer;
      outline: none;
      text-decoration: none;
      font-family: $--font-family;
      background: transparent;
      border-color: transparent;
      margin: 0px;
      padding: 0px;

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
  }

  &__input {
    width: 100%;
    height: 38px;

    font-family: $--font-family;
    font-style: normal;
    font-weight: $--font-weight-normal;
    font-size: $--font-size-base;
    line-height: 24px;

    padding: 0px 15px;
    border: 1px solid #d8d6de;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 5px;
    color: #6e6b7b;

    outline: none;

    &::placeholder {
      color: #b9b9c3;
    }

    &:focus {
      box-shadow: 0 0 0 1px $--color-primary-light;
    }
  }

  &__top_item + &__input {
    margin-top: 2px;
  }
}
</style>
