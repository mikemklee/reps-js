import types from './types';

export const initialState = {
  workoutLogs: [],
  status: {
    saveWorkoutPending: false,
    saveWorkoutSuccess: false,
    getWorkoutLogsPending: false,
    getWorkoutLogsSuccess: false,
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
    case types.GET_WORKOUT_LOGS_REQUEST: {
      return {
        ...state,
        status: {
          ...state.status,
          getWorkoutLogsPending: true,
          getWorkoutLogsSuccess: false,
        },
      };
    }
    case types.GET_WORKOUT_LOGS_SUCCESS: {
      const { workoutLogs } = payload;
      return {
        ...state,
        workoutLogs,
        status: {
          ...state.status,
          getWorkoutLogsPending: false,
          getWorkoutLogsSuccess: true,
        },
      };
    }
    case types.GET_WORKOUT_LOGS_FAILURE: {
      return {
        ...state,
        status: {
          ...state.status,
          getWorkoutLogsPending: false,
          getWorkoutLogsSuccess: false,
        },
      };
    }
    default: {
      return state;
    }
  }
};
