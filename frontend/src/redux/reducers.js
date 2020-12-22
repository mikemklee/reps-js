import { combineReducers } from 'redux';
import workout from './workout/reducer';

const reducers = combineReducers({ workout: workout });

export default reducers;
