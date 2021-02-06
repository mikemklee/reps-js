import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { differenceInSeconds } from 'date-fns';

import './DurationTimer.scss';

import TimeDisplay from '../TimeDisplay/TimeDisplay';

import { TimeUtils } from '../../utils';

const DurationTimer = (props, ref) => {
  const [counter, setCounter] = useState(0);
  const [startTime] = useState(new Date());

  useImperativeHandle(ref, () => counter, [counter]);

  useEffect(() => {
    const durationInterval = setInterval(() => {
      setCounter(differenceInSeconds(new Date(), startTime));
    }, 1000);

    return () => clearInterval(durationInterval);
  }, []);

  const { hours, minutes, seconds } = TimeUtils.parseDuration(counter);

  return (
    <div className='container'>
      <TimeDisplay hours={hours} minutes={minutes} seconds={seconds} />
    </div>
  );
};

export default forwardRef(DurationTimer);
