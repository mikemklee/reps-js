import 'regenerator-runtime/runtime';
import { call, put } from 'redux-saga/effects';
import axios from 'axios';

import actions from '../actions';

export default function* login(action) {
  try {
    const { email, password } = action.payload;

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = {
      email: email,
      password: password,
    };
    const { data } = yield call(axios.post, '/api/users/login', body, config);

    yield put(actions.loginSuccess(data.user));

    localStorage.setItem('reps_userInfo', JSON.stringify(data.user));
  } catch (e) {
    const formattedError = new Error('An unexpected error occured.');
    if (e.response) {
      formattedError.message = e.response.data.message;
    }
    alert(formattedError.message);
    yield put(actions.loginFailure(formattedError));
  }
}
