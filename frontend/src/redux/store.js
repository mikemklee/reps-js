import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import reducers from './reducers';
import { sagas, runSagas } from './sagas';
import { initialState as initialAuthState } from './auth/reducer';

const userInfoFromStorage = localStorage.getItem('reps_userInfo')
  ? JSON.parse(localStorage.getItem('reps_userInfo'))
  : null;

const persistedState = {
  auth: {
    ...initialAuthState,
  },
};

// if (userInfoFromStorage) {
//   persistedState.auth.userId = userInfoFromStorage._id;
//   persistedState.auth.userName = userInfoFromStorage.name;
//   persistedState.auth.userEmail = userInfoFromStorage.email;
//   persistedState.auth.isAdmin = userInfoFromStorage.isAdmin;
//   persistedState.auth.token = userInfoFromStorage.token;
//   persistedState.auth.isAuthenticated = true;
//   persistedState.auth.status = {
//     ...persistedState.auth.status,
//     loginPending: false,
//     loginSuccess: true,
//   };
// }

const loggerOptions = {
  collapsed: true,
  timestamp: false,
};

const logger = createLogger(loggerOptions);

// add `process.env.REACT_APP_HAS_REDUX_LOGGER=true` to .env.development.local
// let middleware;
// TODO: only enable logger for dev env
// if (process.env.NODE_ENV === 'development') {
//   // use redux devtools and redux logger for development
//   middleware = applyMiddleware(sagas, logger);
// } else {
//   // don't use redux devtools or redux logger for production
// }
const middleware = applyMiddleware(sagas, logger);

const store = createStore(reducers, persistedState, middleware);

runSagas();

export default store;
