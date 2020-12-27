import createSagaMiddleWare from 'redux-saga';

import authSaga from './auth/sagas';
import workoutSaga from './workout/sagas';
import exerciseSaga from './exercise/sagas';
import routineSaga from './routine/sagas';

const sagaMiddleWare = createSagaMiddleWare();

const runSagas = () => {
  sagaMiddleWare.run(authSaga);
  sagaMiddleWare.run(workoutSaga);
  sagaMiddleWare.run(exerciseSaga);
  sagaMiddleWare.run(routineSaga);
};

export { sagaMiddleWare as sagas, runSagas };
