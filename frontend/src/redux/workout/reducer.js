import types from './types';

export const initialState = {
  status: {
    saveWorkoutPending: false,
    saveWorkoutSuccess: false,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
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
      const { workout } = payload;
      return {
        ...state,
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
