import types from './types';

export const initialState = {
  presets: [],
  status: {
    getPresetsPending: false,
    getPresetsSuccess: false,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_PRESETS_REQUEST: {
      return {
        ...state,
        status: {
          ...state.status,
          getPresetsPending: true,
          getPresetsSuccess: false,
        },
      };
    }
    case types.GET_PRESETS_SUCCESS: {
      const { presets } = payload;
      return {
        ...state,
        presets,
        status: {
          ...state.status,
          getPresetsPending: false,
          getPresetsSuccess: true,
        },
      };
    }
    case types.GET_PRESETS_FAILURE: {
      return {
        ...state,
        status: {
          ...state.status,
          getPresetsPending: false,
          getPresetsSuccess: false,
        },
      };
    }
    default: {
      return state;
    }
  }
};
