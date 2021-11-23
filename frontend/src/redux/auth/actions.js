import types from './types';

const actions = {
  pingRequest: () => {
    return {
      type: types.PING_REQUEST,
      payload: {},
    };
  },
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
  getUserDataRequest: () => {
    return {
      type: types.GET_USER_DATA_REQUEST,
      payload: {},
    };
  },
  getUserDataSuccess: (user) => {
    return {
      type: types.GET_USER_DATA_SUCCESS,
      payload: {
        user,
      },
    };
  },
  getUserDataFailure: (error) => {
    return {
      type: types.GET_USER_DATA_FAILURE,
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
  updatePreferencesRequest: (preferencesData) => {
    return {
      type: types.UPDATE_PREFERENCES_REQUEST,
      payload: { preferencesData },
    };
  },
  updatePreferencesSuccess: (updatedPreferences) => {
    return {
      type: types.UPDATE_PREFERENCES_SUCCESS,
      payload: { updatedPreferences },
    };
  },
  updatePreferencesFailure: (error) => {
    return {
      type: types.UPDATE_PREFERENCES_FAILURE,
      payload: { error },
    };
  },
  deleteUserRequest: () => {
    return {
      type: types.DELETE_USER_REQUEST,
      payload: {},
    };
  },
  deleteUserSuccess: () => {
    return {
      type: types.DELETE_USER_SUCCESS,
      payload: {},
    };
  },
  deleteUserFailure: (error) => {
    return {
      type: types.DELETE_USER_FAILURE,
      payload: { error },
    };
  },
};

export default actions;
