import React from 'react';
import { useSelector } from 'react-redux';

import './Logs.scss';

import LogItem from './LogItem/LogItem';

const Logs = () => {
  const { workoutLogs } = useSelector((state) => state.workout);

  return (
    <div className='logs-view'>
      <div className='view-header'>Logs</div>
      <div className='view-content'>
        <div className='logs'>
          {workoutLogs.map((item, index) => (
            <LogItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Logs;
