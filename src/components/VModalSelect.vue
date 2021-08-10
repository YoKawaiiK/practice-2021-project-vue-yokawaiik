<template>
  <div class="select-wrapper">
    <div class="select-wrapper__arrow_buttons">
      <span class="arrow_buttons__up" @click="setSelectedItem(false)">
        <img src="@/assets/icons/arrow-up.svg" alt="arrow-up" />
      </span>
      <span class="arrow_buttons__down" @click="setSelectedItem(true)">
        <img src="@/assets/icons/arrow-up.svg" alt="arrow-down" />
      </span>
    </div>
    <select
      :value="selected"
      required
      class="select-wrapper__select-element"
      @change="change($event.target.value)"
    >
      <option class="disable" value="" disabled selected>
        {{ placeholder }}
      </option>
      <option v-for="(item, i) in selectData" :key="i" :value="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "VModalSelect",
  props: {
    selectData: {
      type: Array,
      default: new Array(),
    },
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // start value from param "value" from parent
      selected: this.value,
    };
  },
  methods: {
    // change value in parent
    change(value) {
      this.$emit("input", value);
    },
    // change value in this component
    // element(false - up, true - down)
    setSelectedItem(element) {
      let currentSelectedIndex = this.selectData.indexOf(this.selected);
      let findElement;
      // if first option placeholder
      if (currentSelectedIndex == -1) {
        findElement = 0;
      }
      //  up
      else if (element) {
        findElement =
          currentSelectedIndex == 0
            ? this.selectData.length - 1
            : currentSelectedIndex - 1;
      }
      // down
      else {
        findElement =
          currentSelectedIndex == this.selectData.length - 1
            ? 0
            : currentSelectedIndex + 1;
      }
      this.selected = this.selectData[findElement];
      this.change(this.selected);
    },
  },
};
</script>
<style lang="scss" scoped>
.select-wrapper {
  display: flex;
  flex-direction: row-reverse;

  font-weight: normal;
  gap: 9px;
  width: 100px;
  height: 36px;

  .select-wrapper__arrow_buttons {
    display: flex;
    flex-direction: column;

    .arrow_buttons__up {
      height: 18px;
    }

    .arrow_buttons__down {
      height: 18px;
      transform: rotate(180deg);
    }
  }
  select.select-wrapper__select-element {
    appearance: none;
    font-family: $--font-family;
    border: none;
    background-color: transparent;
    font-size: $--vmodal-select--font-size;
    font-weight: normal;
    min-width: 65px;
    max-width: 100px;
    text-align-last: center;
    direction: rtl;

    > &:focus {
      border: none;
    }

    > option {
      color: $--label-text-color;
    }
  }
}
</style>
