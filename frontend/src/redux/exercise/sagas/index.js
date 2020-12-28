import 'regenerator-runtime/runtime';
import { all, takeLatest } from 'redux-saga/effects';

import types from '../types';

// import each saga
import getPresets from './getPresets';
import getNames from './getNames';

export default function* authSaga() {
  yield all([takeLatest(types.GET_PRESETS_REQUEST, getPresets)]);
  yield all([takeLatest(types.GET_NAMES_REQUEST, getNames)]);
}
