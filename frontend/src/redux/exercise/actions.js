import types from './types';

const actions = {
  getPresetsRequest: (email, password) => {
    return {
      type: types.GET_PRESETS_REQUEST,
      payload: {
        email,
        password,
      },
    };
  },
  getPresetsSuccess: (user) => {
    return {
      type: types.GET_PRESETS_SUCCESS,
      payload: {
        user,
      },
    };
  },
  getPresetsFailure: (error) => {
    return {
      type: types.GET_PRESETS_FAILURE,
      payload: {
        error,
      },
    };
  },
};

export default actions;
