<template>
  <div>
    <PSignForm>
      <template v-slot:header-title>
        <span> Pockets </span>
      </template>
      <template v-slot:header-subtitle>
        <h4>Adventure starts here</h4>
        <p>Make your app management easy and fun!</p>
      </template>

      <template v-slot:content>
        <PSignFormField
          id="username"
          v-model="data.username"
          type="input"
          label="Username"
          placeholder="johndoe"
        />

        <PSignFormField
          id="email"
          v-model="data.email"
          type="input"
          label="Email"
          placeholder="johndoe@gmail.com"
        />

        <PSignFormField
          id="password"
          v-model="data.password"
          type="password"
          label="Password"
          placeholder="••••••••"
        />
        <PSignFormCheckBox id="agree" v-model="data.agreeCheck">
          Я со всем согласен отпустите
        </PSignFormCheckBox>
      </template>
      <template v-slot:item-button>
        <PButton @click="clickSignUp()">Login</PButton>
      </template>
      <template v-slot:item-flex>
        <p>New on our platform?</p>
        <router-link :to="{ name: ROUTE_SIGN_IN }"
          >Create an account</router-link
        >
      </template>
    </PSignForm>
  </div>
</template>

<script>
import PSignForm from "@/components/PSignForm/PSignForm";
import PButton from "@/components/PButton";
import PSignFormField from "@/components/PSignForm/PSignFormField";
import PSignFormCheckBox from "@/components/PSignForm/PSignFormCheckBox";

import { mapActions } from "vuex";

import { SIGN_IN as ROUTE_SIGN_IN } from "@/router/constants/routesNames";

import { AuthService } from "@/services/index";

import { checkFields } from "@/functions/index";

export default {
  name: "SignUp",
  components: { PSignForm, PSignFormCheckBox, PButton, PSignFormField },
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
  created() {
    this.ROUTE_SIGN_IN = ROUTE_SIGN_IN;
  },
  methods: {
    ...mapActions("auth", ["register"]),
    async clickSignUp() {
      if (!checkFields(this.data)) return alert("Поля не заполнены");
      try {
        // await this.$axios.post("/auth/register/", this.data);
        await AuthService.signUp(this.data);
        await this.$router.push({
          name: ROUTE_SIGN_IN,
        });
      } catch (error) {
        let message = Object.entries(error.response.data)
          .map((x) => x[1][0])
          .join(" ");
        alert(message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main";
</style>
