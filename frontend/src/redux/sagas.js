import createSagaMiddleWare from 'redux-saga';

import authSaga from './auth/sagas';
import workoutSaga from './workout/sagas';
import exerciseSaga from './exercise/sagas';

const sagaMiddleWare = createSagaMiddleWare();

const runSagas = () => {
  sagaMiddleWare.run(authSaga);
  sagaMiddleWare.run(workoutSaga);
  sagaMiddleWare.run(exerciseSaga);
};

export { sagaMiddleWare as sagas, runSagas };
