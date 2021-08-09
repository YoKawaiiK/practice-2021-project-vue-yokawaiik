import VToasts from "@/components/VToasts.vue";

const ToastsPlugin = {
  install(Vue) {
    // attach these methods with Vue instance
    Vue.prototype.$toast = {
      /**
       * Send the event on channel (toast-message) with a given payload.
       *
       * @param {string} message
       * @param {string} type
       */
      show(message, type, options) {
        Vue.prototype.$eventBus.$emit("toast-message", {
          message: message,
          type: type,
          options: options,
        });
      },
    };

    // register the component
    Vue.component("VToasts", VToasts);
  },
};

export default ToastsPlugin;
