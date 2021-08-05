import { $axios } from "@/plugins/index";

export default class AuthService {
  static signUp(data) {
    return $axios.post("/api/auth/register/", data);
  }

  static signIn(data) {
    return $axios.post("/api/auth/token/obtain/", data);
  }
}
