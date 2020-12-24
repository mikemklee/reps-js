import { combineReducers } from 'redux';

import auth from './auth/reducer';
import workout from './workout/reducer';

const reducers = combineReducers({ auth: auth, workout: workout });

export default reducers;
