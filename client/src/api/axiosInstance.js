import axios from "axios";
import store from "../state_management/store";

const instance = axios.create({});

instance.defaults.headers.common["auth-token"] = store.getState().account.token;

store.subscribe(() => {
  instance.defaults.headers.common[
    "auth-token"
  ] = store.getState().account.token;
});

export default instance;
