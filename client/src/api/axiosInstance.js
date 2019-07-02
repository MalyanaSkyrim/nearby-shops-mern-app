import axios from "axios";
import store from "../state_management/store";

<<<<<<< HEAD
const instance = axios.create({});
=======
const instance = axios.create({
  // baseURL: "http://localhost:5000"
});
>>>>>>> c390b41... bug fix, datepicker and update profile

instance.defaults.headers.common["auth-token"] = store.getState().account.token;

store.subscribe(() => {
  instance.defaults.headers.common[
    "auth-token"
  ] = store.getState().account.token;
});

export default instance;
