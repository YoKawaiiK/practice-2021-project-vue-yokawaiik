<template>
  <div class="sign">
    <div class="sign-form">
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
            <input id="agree" type="checkbox" />
            <label for="agree">Я со всем согласен отпустите</label>
          </div>
        </div>
        <div class="footer__item">
          <div class="container__item">
            <div class="button" tabindex="0">Sign Up</div>
          </div>
        </div>
        <div class="footer__item item_flex">
          <span class="text_p">Already have an account?</span>
          <!-- <span class="text_p_link">Sign in instead</span> -->
          <a tabindex="0">
            <router-link :to="{ name: 'Signin' }">Sign in instead</router-link>
          </a>
        </div>
      </div>
    </div>

    <div class="sign-form__card">
      <div class="card__shadow"></div>
      <div class="card__background"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Registration",
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main";
@import "@/assets/scss/components/_sign-form";
</style>
