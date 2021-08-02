<template>
  <div>
    <PSignForm :footer-margin-top-big="true">
      <template v-slot:header-title>
        <span> Pockets </span>
      </template>
      <template v-slot:header-subtitle>
        <h4>Welcome to Pockets! 👋🏻</h4>
        <p>Please sign-in to your account and start the adventure</p>
      </template>

      <template v-slot:content>
        <PSignFormField
          id="email"
          v-model="data.email"
          type="input"
          label="Email"
          placeholder="johndoe@gmail.com"
        />

        <PSignFormField
          v-model="data.password"
          type="password"
          placeholder="••••••••"
          help-text="Forgot password?"
          label="Password"
          @help-click="nothing()"
        />
      </template>
      <template v-slot:item-button>
        <PButton @click="clickSignIn()">Login</PButton>
      </template>
      <template v-slot:item-flex>
        <p>New on our platform?</p>
        <router-link :to="{ name: ROUTE_SIGN_UP }"
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

import { mapActions } from "vuex";

import { checkFields } from "@/functions/index";

import { SIGN_UP as ROUTE_SIGN_UP } from "@/router/constants/routesNames";

import { AUTH, SIGN_IN } from "@/store/modules/auth/constants/names";

export default {
  name: "SignIn",
  components: { PSignForm, PButton, PSignFormField },
  data() {
    return {
      data: {
        email: "",
        password: "",
      },
    };
  },
  created() {
    this.ROUTE_SIGN_UP = ROUTE_SIGN_UP;
  },
  methods: {
    ...mapActions(AUTH, [SIGN_IN]),
    clickSignIn() {
      if (!checkFields(this.data)) return alert("Поля не заполнены");
      this[SIGN_IN](this.data);
    },
    nothing() {
      alert("Функция не доступна");
    },
  },
};
</script>
