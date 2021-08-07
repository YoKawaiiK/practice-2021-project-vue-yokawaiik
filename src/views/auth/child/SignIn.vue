<template>
  <div>
    <v-sign-form>
      <template v-slot:header-title>
        <span> Pockets </span>
      </template>
      <template v-slot:header-subtitle>
        <h4>Welcome to Pockets! 👋🏻</h4>
        <p>Please sign-in to your account and start the adventure</p>
      </template>

      <template v-slot:content>
        <v-sign-form-field
          v-for="(field, index) in formData"
          :key="index"
          v-model="field.value"
          :name="field.name"
          :type="field.type"
          :label="field.label"
          :help-text="field.helpText"
          :placeholder="field.placeholder"
          :required="field.required"
          :errors="field.errors"
          v-on="field.helpClick ? { 'help-click': field.helpClick } : {}"
        />
      </template>
      <template v-slot:footer-button>
        <hr />
        <v-button type="submit" @click.prevent="clickSignIn">Login</v-button>
      </template>
      <template v-slot:item-flex>
        <p>New on our platform?</p>
        <router-link :to="{ name: $options.routes.ROUTE_SIGN_UP }"
          >Create an account</router-link
        >
      </template>
    </v-sign-form>
  </div>
</template>

<script>
import VSignForm from "@/components/VSignForm";
import VButton from "@/components/VButton";
import VSignFormField from "@/components/VSignFormField";

import { mapActions } from "vuex";

import { formValidator } from "@/utils/index";

import { ROUTE_SIGN_UP, ROUTE_DASHBOARD } from "@/router/constants/routesNames";

import { AUTH, SIGN_IN } from "@/store/modules/auth/constants/names";

export default {
  name: "SignIn",
  components: { VSignForm, VButton, VSignFormField },
  data() {
    return {
      errors: false,
      formData: [
        {
          name: "email",
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
          required: true,
          errors: [],
          value: "",
        },
        {
          name: "password",
          type: "password",
          label: "Password",
          helpText: "Forgot Password?",
          helpClick: this.helpHandler,
          placeholder: "••••••••",
          required: true,
          errors: [],
          value: "",
        },
      ],
    };
  },
  routes: {
    ROUTE_SIGN_UP,
  },
  methods: {
    ...mapActions(AUTH, [SIGN_IN]),
    helpHandler() {
      this.$toast.show("Функция восстановления недоступна.", "warning");
    },
    async clickSignIn() {
      let validation = formValidator(this.formData);

      // only {[name field]: value}
      let data = Object.assign(
        {},
        ...this.formData.map((field) => ({ [field.name]: field.value }))
      );

      if (validation) {
        let resultSignIn = await this[SIGN_IN](data);
        if (resultSignIn != true) this.$toast.show(resultSignIn, "warning");
        else
          this.$router.push({
            name: ROUTE_DASHBOARD,
          });
      }
    },
  },
};
</script>
