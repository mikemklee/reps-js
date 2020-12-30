import types from './types';

import ReducerUtils from '../../utils/reducer';

export const initialState = {
  presets: {},
  routines: {},
  status: {
    getPresetsPending: false,
    getPresetsSuccess: false,
    saveRoutinePending: false,
    saveRoutineSuccess: false,
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
    case types.SAVE_ROUTINE_REQUEST: {
      return {
        ...state,
        status: {
          ...state.status,
          saveRoutinePending: true,
          saveRoutineSuccess: false,
        },
      };
    }
    case types.SAVE_ROUTINE_SUCCESS: {
      const { savedRoutine } = payload;
      return {
        ...state,
        routines: ReducerUtils.updateObjInMap(state.routines, savedRoutine),
        status: {
          ...state.status,
          saveRoutinePending: false,
          saveRoutineSuccess: true,
        },
      };
    }
    case types.SAVE_ROUTINE_FAILURE: {
      return {
        ...state,
        status: {
          ...state.status,
          saveRoutinePending: false,
          saveRoutineSuccess: false,
        },
      };
    }
    default: {
      return state;
    }
  }
};
