import 'regenerator-runtime/runtime';
import { call, put, select } from 'redux-saga/effects';
import axios from 'axios';

import actions from '../actions';

export default function* updatePreferences(action) {
  try {
    const { token, userId } = yield select((state) => state.auth);
    const { preferencesData } = action.payload;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const body = {
      preferencesData,
    };

    const { data } = yield call(
      axios.post,
      `/api/auth/${userId}/preferences`,
      body,
      config
    );

    yield put(actions.updatePreferencesSuccess(data));
  } catch (e) {
    const formattedError = new Error('An unexpected error occured.');
    if (e.response) {
      formattedError.message = e.response.data.message;
    }
    alert(formattedError.message);
    yield put(actions.updatePreferencesFailure(formattedError));
  }
}
