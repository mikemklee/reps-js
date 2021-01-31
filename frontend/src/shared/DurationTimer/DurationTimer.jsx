import React, { useState, useEffect, forwardRef } from 'react';

import './DurationTimer.scss';

import TimeDisplay from '../TimeDisplay/TimeDisplay';

import { TimeUtils } from '../../utils';

const DurationTimer = (props, ref) => {
  const [counter, setCounter] = useState(0);
  const { hours, minutes, seconds } = TimeUtils.parseDuration(counter);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!ref.current) return;
      const clock = ref.current;
      const elapsed = await clock.getElapsedTime();

      setCounter(Math.floor(elapsed));
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div className='container'>
      <TimeDisplay hours={hours} minutes={minutes} seconds={seconds} />
    </div>
  );
};

export default forwardRef(DurationTimer);
