import types from './types';

export const initialState = {
  token: null,
  userId: '',
  userGoogleId: '',
  userEmail: '',
  userGivenName: '',
  userFamilyName: '',
  userProfileImage: '',
  isAuthenticated: false,
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
      // TODO: implement
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
      // TODO: implement
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
      // TODO: implement
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
        userGoogleId: '',
        userEmail: '',
        userGivenName: '',
        userFamilyName: '',
        userProfileImage: '',
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
        userEmail: user.email,
        userGivenName: user.givenName,
        userFamilyName: user.familyName,
        userProfileImage: user.profileImage,
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
        ...initialState,
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
        ...initialState,
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
