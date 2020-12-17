import React, { useEffect } from 'react';
import moment from 'moment';

import './Timer.scss';

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
      <div className='time'>
        <span className='minute'>
          {minutes < 10 && 0}
          {minutes}
        </span>
        <span>:</span>
        <span className='second'>
          {seconds < 10 && 0}
          {seconds}
        </span>
        <span></span>
      </div>
    </div>
  );
};

export default Timer;
