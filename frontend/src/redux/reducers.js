import { combineReducers } from 'redux';

import auth from './auth/reducer';
import workout from './workout/reducer';
import exercise from './exercise/reducer';

const reducers = combineReducers({
  auth: auth,
  workout: workout,
  exercise: exercise,
});

export default reducers;
