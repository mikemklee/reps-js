import types from './types';

import { ReducerUtils } from '../../utils';

export const initialState = {
  presetRoutines: {},
  customRoutines: {},
  status: {
    getPresetRoutinesPending: false,
    getPresetRoutinesSuccess: false,
    getCustomRoutinesPending: false,
    getCustomRoutinesSuccess: false,
    editCustomRoutinePending: false,
    editCustomRoutineSuccess: false,
    deleteCustomRoutinePending: false,
    deleteCustomRoutineSuccess: false,
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
    case types.EDIT_CUSTOM_ROUTINE_REQUEST: {
      return {
        ...state,
        status: {
          ...state.status,
          editCustomRoutinePending: true,
          editCustomRoutineSuccess: false,
        },
      };
    }
    case types.EDIT_CUSTOM_ROUTINE_SUCCESS: {
      const { editedRoutine } = payload;
      return {
        ...state,
        workoutLogs: ReducerUtils.updateObjInMap(
          state.customRoutines,
          editedRoutine
        ),
        status: {
          ...state.status,
          editCustomRoutinePending: false,
          editCustomRoutineSuccess: true,
        },
      };
    }
    case types.EDIT_CUSTOM_ROUTINE_FAILURE: {
      return {
        ...state,
        status: {
          ...state.status,
          editCustomRoutinePending: false,
          editCustomRoutineSuccess: false,
        },
      };
    }
    case types.DELETE_CUSTOM_ROUTINE_REQUEST: {
      return {
        ...state,
        status: {
          ...state.status,
          deleteCustomRoutinePending: true,
          deleteCustomRoutineSuccess: false,
        },
      };
    }
    case types.DELETE_CUSTOM_ROUTINE_SUCCESS: {
      const { deletedRoutineId } = payload;
      return {
        ...state,
        customRoutines: ReducerUtils.deleteObjsFromMap(state.customRoutines, [
          deletedRoutineId,
        ]),
        status: {
          ...state.status,
          deleteCustomRoutinePending: false,
          deleteCustomRoutineSuccess: true,
        },
      };
    }
    case types.DELETE_CUSTOM_ROUTINE_FAILURE: {
      return {
        ...state,
        status: {
          ...state.status,
          deleteCustomRoutinePending: false,
          deleteCustomRoutineSuccess: false,
        },
      };
    }
    default: {
      return state;
    }
  }
};
