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
  editWorkoutRequest: (workoutData) => {
    return {
      type: types.EDIT_WORKOUT_REQUEST,
      payload: {
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
