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
  setDisplayedWeightUnit: (weightUnit) => {
    return {
      type: types.SET_DISPLAYED_WEIGHT_UNIT,
      payload: { weightUnit },
    };
  },
  setDisplayedDistanceUnit: (distanceUnit) => {
    return {
      type: types.SET_DISPLAYED_DISTANCE_UNIT,
      payload: { distanceUnit },
    };
  },
};

export default actions;
