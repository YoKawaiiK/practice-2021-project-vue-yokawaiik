<template>
  <div class="sign">
    <form class="sign-form" autocomplete="on">
      <div class="sign-form__header">
        <div class="header__title">
          <span> Pockets </span>
        </div>

        <div class="header__subtitle">
          <h4>Welcome to Pockets! 👋🏻</h4>
          <p>Please sign-in to your account and start the adventure</p>
        </div>
      </div>

      <div class="sign-form__content">
        <div class="content__item">
          <div class="field">
            <div class="field__top_item">
              <label for="email" class="top_item__label"> Email </label>
            </div>
            <input
              id="email"
              v-model="data.email"
              name="email"
              type="text"
              class="field__input"
              placeholder="johndoe@gmail.com"
            />
          </div>
        </div>

        <div class="content__item">
          <div class="field">
            <div class="field__top_item">
              <label for="password" class="top_item__label"> Password </label>
              <span class="top_item__help">
                <a tabindex="0">Forgot password?</a></span
              >
            </div>
            <input
              id="password"
              v-model="data.password"
              name="password"
              type="password"
              class="field__input"
              placeholder="••••••••"
            />
          </div>
        </div>
      </div>

      <div class="sign-form__footer footer_margin-top-big">
        <div class="footer__item">
          <div class="container__item">
            <div class="button" tabindex="0" @click="clickSignin()">Login</div>
          </div>
        </div>
        <div class="footer__item item_flex">
          <span class="text_p">New on our platform?</span>
          <a tabindex="0">
            <router-link :to="{ name: 'Signup' }"
              >Create an account</router-link
            >
          </a>
        </div>
      </div>
    </form>

    <div class="sign-form__card">
      <div class="card__shadow"></div>
      <div class="card__background"></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import { checkFields } from "../services/index";

export default {
  name: "Signin",
  data() {
    return {
      data: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions("auth", ["signin"]),
    clickSignin() {
      if (!checkFields(this.data)) return alert("Поля не заполнены");
      this.signin(this.data);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main";
</style>
