import types from './types';

const actions = {
  loginRequest: (email, password) => {
    return {
      type: types.LOGIN_REQUEST,
      payload: {
        email,
        password,
      },
    };
  },
  loginSuccess: (user) => {
    return {
      type: types.LOGIN_SUCCESS,
      payload: {
        user,
      },
    };
  },
  loginFailure: (error) => {
    return {
      type: types.LOGIN_FAILURE,
      payload: {
        error,
      },
    };
  },
  logout: () => {
    return {
      type: types.LOGOUT,
      payload: {},
    };
  },
  setDisplayedWeightUnit: (weightUnit) => {
    return {
      type: types.SET_DISPLAYED_WEIGHT_UNIT,
      payload: { weightUnit },
    };
  },
};

export default actions;
