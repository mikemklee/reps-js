import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import reducers from './reducers';
import { sagas, runSagas } from './sagas';

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

const store = createStore(reducers, middleware);

runSagas();

export default store;
