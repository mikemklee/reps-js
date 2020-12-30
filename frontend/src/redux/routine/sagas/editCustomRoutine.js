import 'regenerator-runtime/runtime';
import { call, put, select } from 'redux-saga/effects';
import axios from 'axios';

import actions from '../actions';

export default function* editCustomRoutine(action) {
  try {
    const { token } = yield select((state) => state.auth);
    const { routineId, routineData } = action.payload;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const body = {
      routineData,
    };

    const { data } = yield call(
      axios.post,
      `/api/routines/${routineId}`,
      body,
      config
    );

    yield put(actions.editCustomRoutineSuccess(data));
  } catch (e) {
    const formattedError = new Error('An unexpected error occured.');
    if (e.response) {
      formattedError.message = e.response.data.message;
    }
    alert(formattedError.message);
    yield put(actions.editCustomRoutineFailure(formattedError));
  }
}
