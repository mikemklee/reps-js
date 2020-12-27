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
};

export default actions;
