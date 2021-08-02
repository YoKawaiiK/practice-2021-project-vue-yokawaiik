import { $axios } from "@/plugins/index";

export default class AuthService {
  static signUp(data) {
    return $axios.post("/auth/register/", data);
  }

  static signIn(data) {
    return $axios.post("/auth/token/obtain/", data);
  }
}
