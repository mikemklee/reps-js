import types from './types';

const actions = {
  resetWorkoutProgress: () => {
    return {
      type: types.RESET_WORKOUT_PROGRESS,
      payload: {},
    };
  },
  saveWorkoutRequest: (workoutData) => {
    return {
      type: types.SAVE_WORKOUT_REQUEST,
      payload: {
        workoutData,
      },
    };
  },
  saveWorkoutSuccess: (savedWorkout) => {
    return {
      type: types.SAVE_WORKOUT_SUCCESS,
      payload: {
        savedWorkout,
      },
    };
  },
  saveWorkoutFailure: (error) => {
    return {
      type: types.SAVE_WORKOUT_FAILURE,
      payload: {
        error,
      },
    };
  },
  editWorkoutRequest: (workoutId, workoutData) => {
    return {
      type: types.EDIT_WORKOUT_REQUEST,
      payload: {
        workoutId,
        workoutData,
      },
    };
  },
  editWorkoutSuccess: (editedWorkout) => {
    return {
      type: types.EDIT_WORKOUT_SUCCESS,
      payload: {
        editedWorkout,
      },
    };
  },
  editWorkoutFailure: (error) => {
    return {
      type: types.EDIT_WORKOUT_FAILURE,
      payload: {
        error,
      },
    };
  },
  deleteWorkoutRequest: (workoutId) => {
    return {
      type: types.DELETE_WORKOUT_REQUEST,
      payload: {
        workoutId,
      },
    };
  },
  deleteWorkoutSuccess: (deletedWorkoutId) => {
    return {
      type: types.DELETE_WORKOUT_SUCCESS,
      payload: {
        deletedWorkoutId,
      },
    };
  },
  deleteWorkoutFailure: (error) => {
    return {
      type: types.DELETE_WORKOUT_FAILURE,
      payload: {
        error,
      },
    };
  },
  getWorkoutLogsRequest: () => {
    return {
      type: types.GET_WORKOUT_LOGS_REQUEST,
      payload: {},
    };
  },
  getWorkoutLogsSuccess: (workoutLogs) => {
    return {
      type: types.GET_WORKOUT_LOGS_SUCCESS,
      payload: {
        workoutLogs,
      },
    };
  },
  getWorkoutLogsFailure: (error) => {
    return {
      type: types.GET_WORKOUT_LOGS_FAILURE,
      payload: {
        error,
      },
    };
  },
};

export default actions;
