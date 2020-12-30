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
};

export default actions;
