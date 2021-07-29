<template>
  <div class="sign">
    <div class="sign-form">
      <div class="sign-form__header">
        <div class="header__title">
          <span> Pockets </span>
        </div>

        <div class="header__subtitle">
          <h4>Welcome to Pockets! 👋🏻</h4>
          <p>
            Please sign-in to your account and start the adventure
          </p>
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
              type="text"
              class="field__input"
              placeholder="johndoe@gmail.com"
            />
          </div>
        </div>
        <!-- <div class="content__item">
          <div class="field">
            <label for="password" class="field__label"> Password </label>
            <input
              id="password"
              type="password"
              class="field__input"
              placeholder="••••••••"
            />
          </div>
        </div> -->

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
            <div class="button" tabindex="0">Login</div>
          </div>
        </div>
        <div class="footer__item item_flex">
          <span class="text_p">New on our platform?</span>
          <!-- <span class="text_p_link">Sign in instead</span> -->
          <a tabindex="0">
            <router-link :to="{ name: 'Signup' }"
              >Create an account</router-link
            >
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
