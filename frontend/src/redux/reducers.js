import { combineReducers } from 'redux';

import auth from './auth/reducer';
import workout from './workout/reducer';
import exercise from './exercise/reducer';
import routine from './routine/reducer';

const reducers = combineReducers({
  auth: auth,
  workout: workout,
  exercise: exercise,
  routine: routine,
});

export default reducers;
