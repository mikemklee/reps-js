import types from './types';

export const initialState = {
  workoutLogs: [],
  status: {
    saveWorkoutPending: false,
    saveWorkoutSuccess: false,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.RESET_WORKOUT_PROGRESS: {
      return {
        ...state,
        status: {
          ...state.status,
          saveWorkoutPending: false,
          saveWorkoutSuccess: false,
        },
      };
    }
    case types.SAVE_WORKOUT_REQUEST: {
      return {
        ...state,
        status: {
          ...state.status,
          saveWorkoutPending: true,
          saveWorkoutSuccess: false,
        },
      };
    }
    case types.SAVE_WORKOUT_SUCCESS: {
      const { savedWorkout } = payload;
      return {
        ...state,
        workoutLogs: [...state.workoutLogs, savedWorkout],
        status: {
          ...state.status,
          saveWorkoutPending: false,
          saveWorkoutSuccess: true,
        },
      };
    }
    case types.SAVE_WORKOUT_FAILURE: {
      return {
        ...state,
        status: {
          ...state.status,
          saveWorkoutPending: false,
          saveWorkoutSuccess: false,
        },
      };
    }
    default: {
      return state;
    }
  }
};
