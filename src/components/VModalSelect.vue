<template>
  <div class="select-wrapper">
    <div class="select-wrapper__arrow_buttons">
      <span class="arrow_buttons__up" @click="setSelectedItem(false)">
        <svg>
          <use xlink:href="@/assets/icons/arrow-up.svg#arrow-up" />
        </svg>
      </span>
      <span class="arrow_buttons__down" @click="setSelectedItem(true)">
        <svg>
          <use xlink:href="@/assets/icons/arrow-up.svg#arrow-up" />
        </svg>
      </span>
    </div>
    <select
      :value="selected"
      required
      class="select-wrapper__select-element"
      :class="{ placeholder: !selected }"
      @change="change($event.target.value)"
    >
      <option class="disable" value="" disabled selected>
        {{ placeholder }}
      </option>
      <option
        v-for="item in filteredSelectData"
        :key="item.id"
        :value="item.id"
      >
        {{ item.name }}
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
      type: [String, Number],
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    // for filter. hide values in edit mode
    categoryType: {
      type: String,
      default: "",
    },
    mode: {
      type: String,
      default: "insert",
    },
  },
  data() {
    return {
      // start value from param "value" from parent
      selected: "",
    };
  },
  computed: {
    filteredSelectData() {
      if (this.categoryType) {
        return this.selectData.filter(
          (item) => item.categoryType === this.categoryType
        );
      } else return this.selectData;
    },
  },
  watch: {
    value() {
      this.selected = this.value;
    },
  },
  methods: {
    // change value in parent
    change(value) {
      this.$emit("input", value);
    },
    // change value in this component
    // element(false - up, true - down)
    setSelectedItem(element) {
      let currentSelectedIndex = this.filteredSelectData.findIndex((item) => {
        return item.id === this.selected;
      });
      let findElement;
      // if first option placeholder
      if (currentSelectedIndex === -1) {
        findElement = 0;
      }
      //  up
      else if (element) {
        findElement =
          currentSelectedIndex === this.filteredSelectData.length - 1
            ? 0
            : currentSelectedIndex + 1;
      }
      // down
      else {
        findElement =
          currentSelectedIndex === 0
            ? this.filteredSelectData.length - 1
            : currentSelectedIndex - 1;
      }
      this.selected = this.filteredSelectData[findElement].id;
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

    .arrow_buttons__up,
    .arrow_buttons__down {
      svg {
        width: 18px;
        height: 18px;
      }
    }
    .arrow_buttons__down {
      svg {
        transform: rotate(180deg);
      }
    }
  }
  select.select-wrapper__select-element {
    appearance: none;
    font-family: $--font-family;
    border: none;
    background-color: transparent;
    font-size: $--vmodal-select--font-size;
    width: 100px;
    text-align-last: center;
    // direction: rtl;
    color: $--vmodal-select--color;
    > &:focus {
      border: none;
    }

    > option {
      color: $--label-text-color;
    }

    &.placeholder {
      color: $--placeholder-color;
    }
  }
}
</style>
