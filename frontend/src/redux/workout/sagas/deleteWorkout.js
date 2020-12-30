import 'regenerator-runtime/runtime';
import { call, put, select } from 'redux-saga/effects';
import axios from 'axios';

import actions from '../actions';

export default function* deleteWorkout(action) {
  try {
    const { token } = yield select((state) => state.auth);
    const { workoutId } = action.payload;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    yield call(axios.delete, `/api/workouts/${workoutId}`, config);

    yield put(actions.deleteWorkoutSuccess(workoutId));
  } catch (e) {
    const formattedError = new Error('An unexpected error occured.');
    if (e.response) {
      formattedError.message = e.response.data.message;
    }
    alert(formattedError.message);
    yield put(actions.deleteWorkoutFailure(formattedError));
  }
}
