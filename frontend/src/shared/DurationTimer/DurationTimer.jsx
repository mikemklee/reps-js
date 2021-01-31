import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';

import './DurationTimer.scss';

import TimeDisplay from '../TimeDisplay/TimeDisplay';

import { TimeUtils } from '../../utils';

const DurationTimer = (props, ref) => {
  const [counter, setCounter] = useState(0);
  const { hours, minutes, seconds } = TimeUtils.parseDuration(counter);

  useImperativeHandle(ref, () => counter, [counter]);

  useEffect(() => {
    const timerFn = setTimeout(() => {
      setCounter(counter + 1);
    }, 1000);

    return () => clearTimeout(timerFn);
  });

  return (
    <div className='container'>
      <TimeDisplay hours={hours} minutes={minutes} seconds={seconds} />
    </div>
  );
};

export default React.memo(forwardRef(DurationTimer));
