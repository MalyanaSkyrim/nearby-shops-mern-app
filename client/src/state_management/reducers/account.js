import {
  SIGNUP_SUCCESS,
  SIGNIN_SUCCESS,
  LOAD_USER,
  LOGOUT,
  UPDATE_PROFILE
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  errors: {},
  token: localStorage.getItem('token')
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SIGNUP_SUCCESS:
      return {
        ...state
      };
    case SIGNIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: payload.token
      };
    case LOAD_USER: {
      return {
        ...state,
        isAuthenticated: true,
        user: payload
      };
    }
    case LOGOUT: {
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: {}
      };
    }
    case UPDATE_PROFILE: {
      return {
        ...state,
        user: payload
      };
    }

    default:
      return state;
  }
}
