import 'regenerator-runtime/runtime';
import { call, put, select } from 'redux-saga/effects';
import axios from 'axios';

import actions from '../actions';

export default function* deleteCustomRoutine(action) {
  try {
    const { token } = yield select((state) => state.auth);
    const { routineId } = action.payload;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    yield call(axios.delete, `/api/routines/${routineId}`, config);

    yield put(actions.deleteCustomRoutineSuccess(routineId));
  } catch (e) {
    const formattedError = new Error('An unexpected error occured.');
    if (e.response) {
      formattedError.message = e.response.data.message;
    }
    alert(formattedError.message);
    yield put(actions.deleteCustomRoutineFailure(formattedError));
  }
}
