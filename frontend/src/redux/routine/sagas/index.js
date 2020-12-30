import 'regenerator-runtime/runtime';
import { all, takeLatest } from 'redux-saga/effects';

import types from '../types';

// import each saga
import getPresets from './getPresets';
import saveRoutine from './saveRoutine';

export default function* authSaga() {
  yield all([takeLatest(types.GET_PRESETS_REQUEST, getPresets)]);
  yield all([takeLatest(types.SAVE_ROUTINE_REQUEST, saveRoutine)]);
}
