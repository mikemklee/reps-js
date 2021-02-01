import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import * as Comlink from 'comlink';

import './DurationTimer.scss';

import TimeDisplay from '../TimeDisplay/TimeDisplay';

import { TimeUtils } from '../../utils';

import ClockWorker from 'comlink-loader!../../workers/clock.worker';

const DurationTimer = (props, ref) => {
  const [counter, setCounter] = useState(0);
  const { hours, minutes, seconds } = TimeUtils.parseDuration(counter);

  useImperativeHandle(ref, () => counter, [counter]);

  const clockRef = useRef(null);

  // start clock
  useEffect(() => {
    const startClock = async () => {
      const clockWorker = new ClockWorker();

      // create a new clock instanfce
      const clock = await new clockWorker.Clock();

      const cb = (payload) => {
        console.log('received!', payload);
      };

      // start the clock
      await clock.start(Comlink.proxy(cb));

      // store clock ref
      clockRef.current = clock;
    };

    startClock();

    // stop the clock on component unmount
    return async () => {
      if (clockRef.current) await clockRef.current.stop();
    };
  }, []);

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
