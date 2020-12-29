import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import './Logs.scss';

import LogItem from './LogItem/LogItem';

import WorkoutActions from '../../redux/workout/actions';

const Logs = () => {
  const dispatch = useDispatch();
  const { workoutLogs } = useSelector((state) => state.workout);

  useEffect(() => {
    dispatch(WorkoutActions.getWorkoutLogsRequest());
  }, []);

  return (
    <div className='logs-view'>
      <div className='view-header'>Logs</div>
      <div className='view-content'>
        <div className='logs'>
          {_.map(workoutLogs, (item, index) => (
            <LogItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Logs;
