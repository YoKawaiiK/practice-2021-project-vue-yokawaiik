<template>
  <div v-show="show" class="modal_window" @click="close">
    <div class="modal_window__modal_content" @click.stop>
      <header class="modal_window__header">
        <div class="header__close_button" tabindex="0" @click="close">
          &#xd7;
        </div>
        <div class="header__header_title">
          <slot name="header-title-text"> </slot>
        </div>
      </header>

      <main class="modal_window__main">
        <slot name="modal-main"> </slot>
      </main>

      <footer class="modal_window__footer">
        <button class="footer__footer_button" @click.prevent="giveData">
          <slot name="footer-button-text"></slot>
        </button>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  name: "VModal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    giveData() {
      this.$emit("give-data");
    },
  },
};
</script>
<style lang="scss" scoped>
hr {
  background-color: $--vmodal--field-wrapper-border-color;
  border: none;
  width: 1px;
  height: 50px;
}
.modal_window {
  position: absolute;

  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  .modal_window__modal_content {
    z-index: 100;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    width: 469px;
    background: $--background-color;
    box-shadow: 10px 27px 42px $--vmodal--shadow-color;
    border-radius: 12px;

    .modal_window__header {
      padding-top: 31px;
      .header__header_title {
        text-align: center;
        display: block;

        color: $--text-color-on-primary-light;
        font-family: $--font-family;
        font-weight: $--font-weight-bold;
        font-size: $--vmodal--header-title--font-size;
      }
      .header__close_button {
        position: absolute;
        display: block;
        right: 10px;
        top: 12px;

        height: 18px;
        width: 18px;
        font-weight: $--font-weight-medium;
        line-height: 18px;
        border: 3px solid $--vmodal--close-button--color;
        color: $--vmodal--close-button--color;
        border-radius: 4px;
        font-size: $--vmodal--close-button--font-size;
        text-align: center;

        transition: all 0.2s;
        cursor: pointer;
        &:focus {
          color: $--color-primary-focus;
          border-color: $--color-primary-focus;
        }
        &:hover {
          border-color: $--color-primary-light;
          color: $--color-primary-light;
        }

        &:active {
          color: $--color-primary;
          border-color: $--color-primary;
        }
      }
    }
    .modal_window__main {
      width: 100%;
    }
    .main__fields {
      display: flex;
      justify-content: space-around;
      margin: 33px 30px 0px;
    }
  }

  .modal_window__footer {
    margin: 18px 0px 0px;
    .footer__footer_button {
      background: $--color-primary;
      border-radius: 0px 0px 12px 12px;
      border-color: transparent;
      width: 100%;

      font-family: $--font-family;
      font-style: normal;
      font-weight: $--font-weight-bold;
      font-size: $--vmodal--footer-button--font-size;
      height: 53px;
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
  }
}
</style>
