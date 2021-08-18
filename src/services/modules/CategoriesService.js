import { $axios } from "@/plugins/index";

export default class CategoriesService {
  static categoriesList() {
    return $axios.get("/api/pockets/categories/");
  }

  static categoryCreate(data) {
    return $axios.post("/api/pockets/categories/", data);
  }
}
