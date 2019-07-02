import {
  SIGNUP_SUCCESS,
  SIGNIN_SUCCESS,
  LOAD_USER,
  LOGOUT,
  UPDATE_PROFILE
} from "./types";
import axios from "../../api/axiosInstance";

export const signup = data => async dispatch => {
  try {
    await axios.post(`/api/auth/signup`, data);
    dispatch({ type: SIGNUP_SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
    return err.response.data.errors;
  }
};

export const signin = data => async dispatch => {
  try {
    const res = await axios.post(`/api/auth/signin`, data);
    const token = res.data.token;
    dispatch({
      type: SIGNIN_SUCCESS,
      payload: { token }
    });

    dispatch(loadUser());
  } catch (err) {
    return err.response.data.errors;
  }
};

export const loadUser = () => async dispatch => {
  try {
    const res = await axios.get(`/api/auth/profile`);
    console.log(res);
    const user = res.data.user;
    dispatch({
      type: LOAD_USER,
      payload: user
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const updateProfile = profile => async dispatch => {
  console.log({ profile });
  try {
    const res = await axios.post(`/api/auth/profile`, profile);
    console.log(profile);
    dispatch({
      type: UPDATE_PROFILE,
      payload: profile
    });
  } catch (err) {
    console.log(err);
  }
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
