import 'regenerator-runtime/runtime';
import { all, takeLatest } from 'redux-saga/effects';

import types from '../types';

// import each saga
import login from './login';
import getUserData from './getUserData';
import logout from './logout';

export default function* authSaga() {
  yield all([takeLatest(types.LOGIN_REQUEST, login)]);
  yield all([takeLatest(types.GET_USER_DATA_REQUEST, getUserData)]);
  yield all([takeLatest(types.LOGOUT, logout)]);
}
