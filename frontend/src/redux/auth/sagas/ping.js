import 'regenerator-runtime/runtime';
import { call } from 'redux-saga/effects';
import axios from 'axios';

export default function* ping() {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = {
      timeNow: Date.now(),
    };

    yield call(axios.post, '/api/users/ping', body, config);
    
    alert('Pinged!');
  } catch (e) {
    alert(e);
  }
}
