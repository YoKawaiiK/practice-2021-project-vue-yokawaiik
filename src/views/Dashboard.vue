<template>
  <div class="dashboard">
    <h1 class="dashboard__title">Pockets</h1>
    <div class="dashboard__content">
      <div class="content__transactions_table">
        <the-transactions-table></the-transactions-table>
      </div>
      <div class="content__categories_table"><the-categories-table /></div>
    </div>
  </div>
</template>

<script>
import TheCategoriesTable from "@/components/TheCategoriesTable";
import TheTransactionsTable from "@/components/TheTransactionsTable";

export default {
  name: "Dashboard",
  components: { TheCategoriesTable, TheTransactionsTable },
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

    display: grid;
    // grid-template-rows: auto;
    grid-template-areas:
      "transactions-table transactions-table categories-table ."
      "transactions-table transactions-table categories-table ."
      ". . . .";
    column-gap: 22px;

    justify-items: stretch;
    justify-content: start;

    .content__transactions_table {
      grid-area: transactions-table;
    }
    .content__categories_table {
      grid-area: categories-table;
    }
  }
}
</style>
