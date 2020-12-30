import types from './types';

import ReducerUtils from '../../utils/reducer';

export const initialState = {
  presetRoutines: {},
  customRoutines: {},
  status: {
    getPresetRoutinesPending: false,
    getPresetRoutinesSuccess: false,
    getCustomRoutinesPending: false,
    getCustomRoutinesSuccess: false,
    saveRoutinePending: false,
    saveRoutineSuccess: false,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_PRESET_ROUTINES_REQUEST: {
      return {
        ...state,
        status: {
          ...state.status,
          getPresetRoutinesPending: true,
          getPresetRoutinesSuccess: false,
        },
      };
    }
    case types.GET_PRESET_ROUTINES_SUCCESS: {
      const { presetRoutines } = payload;
      return {
        ...state,
        presetRoutines: ReducerUtils.composeObjsMap(presetRoutines),
        status: {
          ...state.status,
          getPresetRoutinesPending: false,
          getPresetRoutinesSuccess: true,
        },
      };
    }
    case types.GET_PRESET_ROUTINES_FAILURE: {
      return {
        ...state,
        status: {
          ...state.status,
          getPresetRoutinesPending: false,
          getPresetRoutinesSuccess: false,
        },
      };
    }
    case types.GET_CUSTOM_ROUTINES_REQUEST: {
      return {
        ...state,
        status: {
          ...state.status,
          getCustomRoutinesPending: true,
          getCustomRoutinesSuccess: false,
        },
      };
    }
    case types.GET_CUSTOM_ROUTINES_SUCCESS: {
      const { customRoutines } = payload;
      return {
        ...state,
        customRoutines: ReducerUtils.composeObjsMap(customRoutines),
        status: {
          ...state.status,
          getCustomRoutinesPending: false,
          getCustomRoutinesSuccess: true,
        },
      };
    }
    case types.GET_CUSTOM_ROUTINES_FAILURE: {
      return {
        ...state,
        status: {
          ...state.status,
          getCustomRoutinesPending: false,
          getCustomRoutinesSuccess: false,
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
