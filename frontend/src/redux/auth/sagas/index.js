import 'regenerator-runtime/runtime';
import { all, takeLatest } from 'redux-saga/effects';

import types from '../types';

// import each saga
import login from './login';
import logout from './logout';

export default function* authSaga() {
  yield all([takeLatest(types.LOGIN_REQUEST, login)]);
  yield all([takeLatest(types.LOGOUT, logout)]);
}
