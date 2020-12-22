import createSagaMiddleWare from 'redux-saga';

import workoutSaga from './workout/sagas';

const sagaMiddleWare = createSagaMiddleWare();

const runSagas = () => {
  sagaMiddleWare.run(workoutSaga);
};

export { sagaMiddleWare as sagas, runSagas };
