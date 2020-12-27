import 'regenerator-runtime/runtime';
import { all, takeLatest } from 'redux-saga/effects';

import types from '../types';

// import each saga
import getPresets from './getPresets';

export default function* authSaga() {
  yield all([takeLatest(types.GET_PRESETS_REQUEST, getPresets)]);
}
