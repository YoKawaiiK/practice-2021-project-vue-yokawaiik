<template>
  <div class="dashboard">
    <h1 class="dashboard__title">Pockets</h1>
    <div class="dashboard__content">
      <div class="dashboard__category"><the-categories-table /></div>
    </div>
  </div>
</template>

<script>
import TheCategoriesTable from "@/components/TheCategoriesTable";
export default {
  name: "Dashboard",
  components: { TheCategoriesTable },
};
</script>
<style lang="scss" scoped>
.dashboard {
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
