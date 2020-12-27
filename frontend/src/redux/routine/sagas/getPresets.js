import 'regenerator-runtime/runtime';
import { call, put, select } from 'redux-saga/effects';
import axios from 'axios';

import actions from '../actions';

export default function* getPresets() {
  try {
    const { token } = yield select((state) => state.auth);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = yield call(axios.get, '/api/routines/presets', config);
    yield put(actions.getPresetsSuccess(data));
  } catch (e) {
    const formattedError = new Error('An unexpected error occured.');
    if (e.response) {
      formattedError.message = e.response.data.message;
    }
    alert(formattedError.message);
    yield put(actions.getPresetsFailure(formattedError));
  }
}
