import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import reducers from './reducers';
import { sagas, runSagas } from './sagas';
import { initialState as initialAuthState } from './auth/reducer';

const persistedState = {
  auth: {
    ...initialAuthState,
  },
};

let middleware;
if (
  process.env.NODE_ENV === 'development' &&
  process.env.REACT_APP_USE_REDUX_LOGGER === 'true'
) {
  // use redux logger only for development
  const loggerOptions = {
    collapsed: true,
    timestamp: false,
  };

  const logger = createLogger(loggerOptions);

  middleware = applyMiddleware(sagas, logger);
} else {
  middleware = applyMiddleware(sagas);
}

const store = createStore(reducers, persistedState, middleware);

runSagas();

export default store;
