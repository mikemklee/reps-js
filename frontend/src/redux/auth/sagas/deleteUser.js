import 'regenerator-runtime/runtime';
import { call, put, select } from 'redux-saga/effects';
import axios from 'axios';

import actions from '../actions';

export default function* deleteUser() {
  try {
    const { token, userId } = yield select((state) => state.auth);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    yield call(axios.delete, `/api/auth/${userId}`, config);

    yield put(actions.deleteUserSuccess());
  } catch (e) {
    const formattedError = new Error('An unexpected error occured.');
    if (e.response) {
      formattedError.message = e.response.data.message;
    }
    alert(formattedError.message);
    yield put(actions.deleteUserFailure(formattedError));
  }
}
