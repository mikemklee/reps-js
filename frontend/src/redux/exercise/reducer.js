import types from './types';

import ReducerUtils from '../../utils/reducer';

export const initialState = {
  presets: {},
  names: {},
  status: {
    getPresetsPending: false,
    getPresetsSuccess: false,
    getNamesPending: false,
    getNamesSuccess: false,
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
        presets: ReducerUtils.composeObjsMap(presets),
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
    case types.GET_NAMES_REQUEST: {
      return {
        ...state,
        status: {
          ...state.status,
          getNamesPending: true,
          getNamesSuccess: false,
        },
      };
    }
    case types.GET_NAMES_SUCCESS: {
      const { names } = payload;
      return {
        ...state,
        names,
        status: {
          ...state.status,
          getNamesPending: false,
          getNamesSuccess: true,
        },
      };
    }
    case types.GET_NAMES_FAILURE: {
      return {
        ...state,
        status: {
          ...state.status,
          getNamesPending: false,
          getNamesSuccess: false,
        },
      };
    }
    default: {
      return state;
    }
  }
};
