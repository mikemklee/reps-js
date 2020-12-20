import React, { useEffect } from 'react';
import moment from 'moment';

import './Timer.scss';

import TimeDisplay from '../../../shared/TimeDisplay/TimeDisplay';

const Timer = ({ counter, setCounter }) => {
  useEffect(() => {
    const timerFn = setTimeout(() => {
      setCounter(counter + 1);
    }, 1000);

    return () => clearTimeout(timerFn);
  });

  const duration = moment.duration(counter, 'seconds');
  const minutes = Math.floor(duration.minutes());
  const seconds = duration.seconds() % 60;

  return (
    <div className='container'>
      <TimeDisplay minutes={minutes} seconds={seconds} />
    </div>
  );
};

export default Timer;
