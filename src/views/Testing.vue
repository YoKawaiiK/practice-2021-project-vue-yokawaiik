<template>
  <div>
    <v-modal :show-modal="showModal" @click="parent"></v-modal>
    <button @click="showModal = !showModal">111</button>
  </div>
</template>

<script>
import VModal from "@/components/VModal";

export default {
  name: "Testing",
  components: { VModal },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    parent(modalData) {
      console.log("parent", modalData);
    },
  },
};
</script>
