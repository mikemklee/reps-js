import types from './types';

const actions = {
  getPresetRoutinesRequest: () => {
    return {
      type: types.GET_PRESET_ROUTINES_REQUEST,
      payload: {},
    };
  },
  getPresetRoutinesSuccess: (presetRoutines) => {
    return {
      type: types.GET_PRESET_ROUTINES_SUCCESS,
      payload: {
        presetRoutines,
      },
    };
  },
  getPresetRoutinesFailure: (error) => {
    return {
      type: types.GET_PRESET_ROUTINES_FAILURE,
      payload: {
        error,
      },
    };
  },
  getCustomRoutinesRequest: () => {
    return {
      type: types.GET_CUSTOM_ROUTINES_REQUEST,
      payload: {},
    };
  },
  getCustomRoutinesSuccess: (customRoutines) => {
    return {
      type: types.GET_CUSTOM_ROUTINES_SUCCESS,
      payload: {
        customRoutines,
      },
    };
  },
  getCustomRoutinesFailure: (error) => {
    return {
      type: types.GET_CUSTOM_ROUTINES_FAILURE,
      payload: {
        error,
      },
    };
  },
  saveRoutineRequest: (routineData) => {
    return {
      type: types.SAVE_ROUTINE_REQUEST,
      payload: {
        routineData,
      },
    };
  },
  saveRoutineSuccess: (savedRoutine) => {
    return {
      type: types.SAVE_ROUTINE_SUCCESS,
      payload: {
        savedRoutine,
      },
    };
  },
  saveRoutineFailure: (error) => {
    return {
      type: types.SAVE_ROUTINE_FAILURE,
      payload: {
        error,
      },
    };
  },
  editCustomRoutineRequest: (routineId) => {
    return {
      type: types.EDIT_CUSTOM_ROUTINE_REQUEST,
      payload: {
        routineId,
      },
    };
  },
  editCustomRoutineSuccess: (editedRoutine) => {
    return {
      type: types.EDIT_CUSTOM_ROUTINE_SUCCESS,
      payload: {
        editedRoutine,
      },
    };
  },
  editCustomRoutineFailure: (error) => {
    return {
      type: types.EDIT_CUSTOM_ROUTINE_FAILURE,
      payload: {
        error,
      },
    };
  },
  deleteCustomRoutineRequest: (routineId) => {
    return {
      type: types.DELETE_CUSTOM_ROUTINE_REQUEST,
      payload: {
        routineId,
      },
    };
  },
  deleteCustomRoutineSuccess: (deletedRoutineId) => {
    return {
      type: types.DELETE_CUSTOM_ROUTINE_SUCCESS,
      payload: {
        deletedRoutineId,
      },
    };
  },
  deleteCustomRoutineFailure: (error) => {
    return {
      type: types.DELETE_CUSTOM_ROUTINE_FAILURE,
      payload: {
        error,
      },
    };
  },
};

export default actions;
