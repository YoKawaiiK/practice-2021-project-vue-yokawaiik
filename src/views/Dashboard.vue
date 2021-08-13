<template>
  <div class="dashboard">
    <h1 class="dashboard__title">Pockets</h1>
    <div class="dashboard__content">
      <div class="dashboard__category"><the-category /></div>
    </div>
  </div>
</template>

<script>
import TheCategory from "@/components/TheCategory";

export default {
  name: "Dashboard",
  components: { TheCategory },
};
</script>
<style lang="scss" scoped>
.dashboard {
  height: calc(100vh - 40px);
  padding: 40px 60px 0px 60px;
  .dashboard__title {
    margin: 0;
    color: $--title-color;
    font-size: $--title-font-size;
  }
  .dashboard__content {
    margin-top: 20px;
  }
}
</style>
