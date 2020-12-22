import 'regenerator-runtime/runtime';
import { put } from 'redux-saga/effects';

import actions from '../actions';

export default function* saveWorkout(action) {
  try {
    const { workoutData } = action.payload;

    // TODO: persist data in DB

    yield put(actions.saveWorkoutSuccess(workoutData));
  } catch (e) {
    const formattedError = new Error('An unexpected error occured.');
    if (e.response) {
      formattedError.message = e.response.data.message;
    }
    alert(formattedError.message);
    yield put(actions.saveWorkoutFailure(formattedError));
  }
}
