import types from './types';

export const initialState = {
  userId: '',
  userGoogleId: '',
  isAuthenticated: false,
  token: null,
  userProfileImage: '',
  userDisplayName: '',
  userPreferences: {},
  status: {
    loginPending: false,
    loginSucces: false,
    getUserDataPending: false,
    getUserDataSuccess: false,
    updatePreferencesPending: false,
    updatePreferencesSuccess: false,
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
        token: user.token,
        isAdmin: user.isAdmin,
        isAuthenticated: true,
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
    case types.GET_USER_DATA_REQUEST: {
      return {
        ...state,
        userId: '',
        userName: '',
        userEmail: '',
        isAuthenticated: false,
        status: {
          ...state.status,
          getUserDataPending: true,
          getUserDataSuccess: false,
        },
      };
    }
    case types.GET_USER_DATA_SUCCESS: {
      const { user } = payload;
      return {
        ...state,
        userId: user._id,
        userGoogleId: user.googleId,
        userProfileImage: user.profileImage,
        userDisplayName: user.displayName,
        userPreferences: user.preferences,
        isAuthenticated: true,
        status: {
          ...state.status,
          getUserDataPending: false,
          getUserDataSuccess: true,
        },
      };
    }
    case types.GET_USER_DATA_FAILURE: {
      return {
        ...state,
        userId: '',
        userGoogleId: '',
        userProfileImage: '',
        userDisplayName: '',
        isAuthenticated: false,
        status: {
          ...state.status,
          getUserDataPending: false,
          getUserDataSuccess: false,
        },
      };
    }
    case types.LOGOUT: {
      return {
        ...state,
        userId: '',
        userName: '',
        userEmail: '',
        token: null,
        isAuthenticated: false,
        isAdmin: false,
        status: {
          ...state.status,
          loginPending: false,
          loginSuccess: false,
        },
      };
    }
    case types.UPDATE_PREFERENCES_REQUEST: {
      return {
        ...state,
        status: {
          ...state.status,
          updatePreferencesPending: true,
          updatePreferencesSuccess: false,
        },
      };
    }
    case types.UPDATE_PREFERENCES_SUCCESS: {
      return {
        ...state,
        userPreferences: payload.updatedPreferences,
        status: {
          ...state.status,
          updatePreferencesPending: false,
          updatePreferencesSuccess: true,
        },
      };
    }
    case types.UPDATE_PREFERENCES_FAILURE: {
      return {
        ...state,
        status: {
          ...state.status,
          updatePreferencesPending: false,
          updatePreferencesSuccess: false,
        },
      };
    }
    case types.DELETE_USER_REQUEST: {
      return {
        ...state,
        status: {
          ...state.status,
          deleteUserPending: true,
          deleteUserSuccess: false,
        },
      };
    }
    case types.DELETE_USER_SUCCESS: {
      return {
        ...state,
        userId: '',
        userName: '',
        userEmail: '',
        token: null,
        isAuthenticated: false,
        isAdmin: false,
        status: {
          ...state.status,
          deleteUserPending: false,
          deleteUserSuccess: true,
        },
      };
    }
    case types.DELETE_USER_FAILURE: {
      return {
        ...state,
        status: {
          ...state.status,
          deleteUserPending: false,
          deleteUserSuccess: false,
        },
      };
    }
    default: {
      return state;
    }
  }
};
