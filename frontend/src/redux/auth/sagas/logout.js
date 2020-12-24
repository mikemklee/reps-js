import 'regenerator-runtime/runtime';
import { call } from 'redux-saga/effects';

export default function* logout() {
  yield call([localStorage, 'removeItem'], 'digitalFinanceSandbox_userInfo');
}
