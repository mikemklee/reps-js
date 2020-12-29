import 'regenerator-runtime/runtime';
import { all, takeLatest } from 'redux-saga/effects';

import types from '../types';

// import each saga
import saveWorkout from './saveWorkout';
import editWorkout from './editWorkout';
import getWorkoutLogs from './getWorkoutLogs';

export default function* authSaga() {
  yield all([takeLatest(types.SAVE_WORKOUT_REQUEST, saveWorkout)]);
  yield all([takeLatest(types.EDIT_WORKOUT_REQUEST, editWorkout)]);
  yield all([takeLatest(types.GET_WORKOUT_LOGS_REQUEST, getWorkoutLogs)]);
}
