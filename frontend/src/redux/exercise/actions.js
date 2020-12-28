import types from './types';

const actions = {
  getPresetsRequest: () => {
    return {
      type: types.GET_PRESETS_REQUEST,
      payload: {},
    };
  },
  getPresetsSuccess: (presets) => {
    return {
      type: types.GET_PRESETS_SUCCESS,
      payload: {
        presets,
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
  getNamesRequest: () => {
    return {
      type: types.GET_NAMES_REQUEST,
      payload: {},
    };
  },
  getNamesSuccess: (names) => {
    return {
      type: types.GET_NAMES_SUCCESS,
      payload: {
        names,
      },
    };
  },
  getNamesFailure: (error) => {
    return {
      type: types.GET_NAMES_FAILURE,
      payload: {
        error,
      },
    };
  },
};

export default actions;
