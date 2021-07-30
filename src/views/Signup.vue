<template>
  <div class="sign">
    <form class="sign-form" autocomplete="on">
      <div class="sign-form__header">
        <div class="header__title">
          <span> Pockets </span>
        </div>

        <div class="header__subtitle">
          <h4>Adventure starts here</h4>
          <p>Make your app management easy and fun!</p>
        </div>
      </div>

      <div class="sign-form__content">
        <div class="content__item">
          <div class="field">
            <div class="field__top_item">
              <label for="username" class="top_item__label"> Username </label>
            </div>
            <input
              id="username"
              v-model="data.username"
              type="text"
              class="field__input"
              placeholder="johndoe@gmail.com"
            />
          </div>
        </div>
        <div class="content__item">
          <div class="field">
            <div class="field__top_item">
              <label for="email" class="top_item__label"> Email </label>
            </div>
            <input
              id="email"
              v-model="data.email"
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
            </div>
            <input
              id="password"
              v-model="data.password"
              type="password"
              class="field__input"
              placeholder="••••••••"
            />
          </div>
        </div>
      </div>

      <div class="sign-form__footer">
        <div class="footer__item">
          <div class="checkbox">
            <input id="agree" v-model="data.agreeCheck" type="checkbox" />
            <label for="agree">Я со всем согласен отпустите</label>
          </div>
        </div>
        <div class="footer__item">
          <div class="container__item">
            <div class="button" tabindex="0" @click="signupClick()">
              Sign Up
            </div>
          </div>
        </div>
        <div class="footer__item item_flex">
          <span class="text_p">Already have an account?</span>
          <a tabindex="0">
            <router-link :to="{ name: 'Signin' }">Sign in instead</router-link>
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
  name: "Signup",
  data() {
    return {
      data: {
        username: undefined,
        email: undefined,
        password: undefined,
        agreeCheck: false,
      },
    };
  },
  methods: {
    ...mapActions("auth", ["register"]),
    async signupClick() {
      if (!checkFields(this.data)) return alert("Поля не заполнены");
      try {
        await this.$axios.post("/auth/register/", this.data);
        await this.$router.push({
          name: "Signin",
        });
        // i maybe change it
      } catch (error) {
        alert("Такой пользователь уже существует");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main";
</style>
