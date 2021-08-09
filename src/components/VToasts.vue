<template>
  <div aria-live="polite" aria-atomic="true" class="toasts">
    <TransitionGroup name="toast" tag="div" appear>
      <div
        v-for="item in messages"
        :key="item.id"
        class="toasts__toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        @mouseover="pauseProgress(item)"
        @mouseout="resumeProgress(item)"
      >
        <div v-if="visibleProgress(item)" class="toast__section_progress">
          <div
            :style="{ width: getCurrentProgress(item) + '%' }"
            :class="'theme_type-' + item.type"
          />
        </div>

        <header
          class="toast__header"
          :class="'theme_type-' + item.type"
          style="height: 35px"
        >
          <button
            v-if="item.closeable"
            type="button"
            class="header__button-close"
            data-dismiss="toast"
            aria-label="Close"
            @click.prevent="remove(item)"
          >
            <span class aria-hidden="true">&times;</span>
          </button>
        </header>
        <main class="toast__content">{{ item.message }}</main>
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
export default {
  name: "VToasts",
  props: {
    showProgress: {
      type: Boolean,
      default: true,
    },
    maxMessages: {
      type: Number,
      default: 5,
    },
    timeOut: {
      type: Number,
      default: 3000,
    },
    closeable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      messages: [],
      count: 0,
    };
  },
  created() {
    // start listening for "toast-message" channel's events
    this.$eventBus.$on("toast-message", this.handleMessageEvent);
  },
  methods: {
    // visible progress indicator
    visibleProgress(item) {
      return item.timeOut > 0 && item.showProgress;
    },
    /**
     * Handle a message event.
     *
     * @param {object} payload
     */
    handleMessageEvent(payload) {
      if (payload.message) {
        this.addMessage(payload.message, payload.type, payload.options);
      }
    },
    /**
     * Add a message to the list.
     *
     * @param {string} message
     * @param {string} type
     */
    addMessage(message, type, options = {}) {
      // message object data
      var messageData = {
        id: this.count++,
        message: message,
        type: type,
        showProgress: this.showProgress,
        timeOut: this.timeOut,
        closeable: this.closeable,
        rtl: this.rtl,
        progress: 0,
        paused: false,
        animationFrame: null,
      };
      // merge custom options
      messageData = Object.assign({}, messageData, options);
      // prepend new message to front of messages's array
      this.messages.unshift(messageData);
      // check if maximum messages to store has been reached
      if (this.messages.length > this.maxMessages) {
        // remove from the end
        this.messages.splice(this.maxMessages);
      }
      if (messageData.timeOut > 0) {
        // start message timeout
        this.startTimeout(messageData);
      }
    },
    /**
     * Start progress bar.
     * @param startTime {number}
     * @default 0
     */
    startTimeout(messageData, startFrom = 0) {
      const self = this;
      // performance.now() will give more precision to be used for a smooth prograss bar
      const startTime = performance.now();
      const start = () => {
        // start animation calculating
        messageData.animationFrame = requestAnimationFrame((timestamp) => {
          const timeElapsed = timestamp + startFrom - startTime;
          // check if is message object already was removed
          // or prograss a toast message was hovered on
          if (!self.exists(messageData) || messageData.paused) {
            // cancel the animation
            cancelAnimationFrame(messageData.animationFrame);
            return;
            // check if timout value has not been reached
          } else if (timeElapsed < messageData.timeOut) {
            // calcalute the prograss
            const progress = timeElapsed / messageData.timeOut;
            // set a new progress
            messageData.progress = progress;
            // continue calculating the progress
            start();
          } else {
            // timout has been reached
            messageData.progress = 1;
            // cancel the animation
            cancelAnimationFrame(messageData.animationFrame);
            // remove message from array
            self.remove(messageData);
            return;
          }
        });
      };
      start();
    },
    /**
     * Pause prograss bar when hovering on a toast.
     *
     * @param {object} messageData
     */
    pauseProgress(messageData) {
      if (messageData.timeOut <= 0) return;
      messageData.paused = true;
    },
    /**
     * Resume prograss bar when going a way from 'mouseover' status.
     *
     * @param {object} messageData
     */
    resumeProgress(messageData) {
      if (messageData.timeOut <= 0) return;
      messageData.paused = false;
      // re-start animation calculating with a given start point
      this.startTimeout(
        messageData,
        messageData.timeOut * messageData.progress
      );
    },
    /**
     * Get current message prograss.
     *
     * @param {object} messageData
     */
    getCurrentProgress(messageData) {
      // set prograss to "100" when progress value is close to 100.
      // why? sometimes when a prograss is someting like (99.899)
      // it will show a little empty space at the end of prograss
      // bar which doesnt get filled.
      if (Math.round(messageData.progress * 100) === 100) {
        return 100;
      }
      return messageData.progress * 100;
    },
    /**
     * Remove a message from the list.
     *
     * @param {number} id
     */
    remove(messageData) {
      const index = this.messages.findIndex(
        (message) => message.id === messageData.id
      );
      this.messages.splice(index, 1);
    },
    /**
     * Remove a message from the list.
     *
     * @param {number} id
     */
    exists(messageData) {
      const index = this.messages.findIndex(
        (message) => message.id === messageData.id
      );
      if (index === -1) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.toasts {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 350px;
  z-index: 1000;

  .toasts__toast {
    overflow: hidden;
    border-radius: 6px;
    background-color: $--background-color;
    color: $--text-color-on-primary-light;

    &:not(:first-child) {
      margin-top: 20px;
    }

    .toast__section_progress {
      height: 6px;
      width: 100%;
      > :only-child {
        width: 100%;
        height: 100%;
      }
    }
  }

  .toast__header {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .header__button-close {
      background: none;
      border: none;
      margin-right: 10px;
      font-size: $--font-size-base;
      padding: 2px 4px;

      cursor: pointer;
      outline: none;
    }
  }
  .toast__content {
    padding: 10px;
    word-wrap: break-word;
  }
}

.theme_type {
  &-primary {
    background-color: $--color-primary;
  }
  &-success {
    background-color: $--color-success;
  }
  &-warning {
    background-color: $--color-warning;
  }
  &-danger {
    background-color: $--color-danger;
  }
  &-info {
    background-color: $--color-info;
  }
}

.toast-enter {
  border: 1px solid black;

  opacity: 0.5;
}
.toast-enter-active {
  transition: opacity 0.5s ease-in;
}
.toast-enter-to {
  opacity: 1;
}
.toast-leave {
  opacity: 0.5;
}
.toast-leave-active {
  opacity: 0;
  transition: opacity 0.5s ease-out;
}
.toast-leave-to {
  opacity: 0;
}
</style>
