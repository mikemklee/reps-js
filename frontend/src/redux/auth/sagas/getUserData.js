import 'regenerator-runtime/runtime';
import { call, put } from 'redux-saga/effects';

import AuthActions from '../actions';
import ExerciseActions from '../../exercise/actions';

export default function* getUserData() {
  try {
    const config = {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    };
    const response = yield call(
      fetch,
      `${process.env.REACT_APP_API_HOST}/api/auth/login/success`,
      config
    );

    if (response.status === 401) {
      yield put(
        AuthActions.getUserDataFailure(
          new Error('Failed to authenticated user')
        )
      );
      return;
    }

    let data;
    if (response.status === 200) {
      data = yield call([response, response.json]);
    }

    yield put(AuthActions.getUserDataSuccess(data.user));
    yield put(ExerciseActions.getNamesRequest());
  } catch (e) {
    console.log('get user data error', JSON.stringify(e, null, 4));
    const formattedError = new Error('An unexpected error occured.');
    if (e.response) {
      formattedError.message = e.response.data.message;
    }
    alert(formattedError.message);
    yield put(AuthActions.getUserDataFailure(formattedError));
  }
}
