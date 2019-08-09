import axios from "axios";
import store from "../state_management/store";

const instance = axios.create({
  // baseURL: "http://localhost:5000"
});

instance.defaults.headers.common["auth-token"] = store.getState().account.token;

store.subscribe(() => {
  instance.defaults.headers.common[
    "auth-token"
  ] = store.getState().account.token;
});

export default instance;
