import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import moment from 'moment';

import './DurationTimer.scss';

import TimeDisplay from '../../../shared/TimeDisplay/TimeDisplay';

const DurationTimer = (props, ref) => {
  const [counter, setCounter] = useState(0);

  useImperativeHandle(ref, () => counter, [counter]);

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

export default React.memo(forwardRef(DurationTimer));
