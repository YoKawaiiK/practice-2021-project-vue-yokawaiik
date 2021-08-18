import { $axios } from "@/plugins/index";

export default class TransactionsService {
  static transactionsList(data) {
    // data = query (limit, offset, start_date, end_date)
    return $axios.get("/api/pockets/transactions/", { params: data });
  }

  static transactionCreate(data) {
    return $axios.post("/api/pockets/transactions/", data);
  }

  // update
  static transactionPartialUpdate(data) {
    return $axios.patch(`/api/pockets/transactions/${data.id}/`, data);
  }

  // delete
  static transactionDelete(transaction_id) {
    return $axios.delete(`/api/pockets/transactions/${transaction_id}/`);
  }
}
