import types from './types';

export const initialState = {
  userId: '',
  userName: '',
  userEmail: '',
  isAuthenticated: false,
  isAdmin: false,
  status: {
    loginPending: false,
    loginSucces: false,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.LOGIN_REQUEST: {
      return {
        ...state,
        userId: '',
        userName: '',
        userEmail: '',
        isAuthenticated: false,
        status: {
          ...state.status,
          loginPending: true,
          loginSuccess: false,
        },
      };
    }
    case types.LOGIN_SUCCESS: {
      const { user } = payload;
      return {
        ...state,
        userId: user._id,
        userName: user.name,
        userEmail: user.email,
        isAuthenticated: true,
        isAdmin: user.isAdmin,
        status: {
          ...state.status,
          loginPending: false,
          loginSuccess: true,
        },
      };
    }
    case types.LOGIN_FAILURE: {
      return {
        ...state,
        userId: '',
        userName: '',
        userEmail: '',
        isAuthenticated: false,
        status: {
          ...state.status,
          loginPending: false,
          loginSuccess: false,
        },
      };
    }
    case types.LOGOUT: {
      return {
        ...state,
        userId: '',
        userName: '',
        userEmail: '',
        isAuthenticated: false,
        isAdmin: false,
        status: {
          ...state.status,
          loginPending: false,
          loginSuccess: false,
        },
      };
    }
    default: {
      return state;
    }
  }
};
