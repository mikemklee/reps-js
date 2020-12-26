import 'regenerator-runtime/runtime';
import { call } from 'redux-saga/effects';

export default function* logout() {
  yield call([localStorage, 'removeItem'], 'reps_userInfo');
}
