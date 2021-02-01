import React, {
  useState,
  useEffect,
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

  // start clock
  useEffect(() => {
    let clock;

    const startClock = async () => {
      const clockWorker = new ClockWorker();

      // create a new clock instance
      clock = await new clockWorker.Clock();

      const cb = (payload) => {
        setCounter(payload.elapsed);
      };

      // start the clock
      await clock.start(Comlink.proxy(cb));
    };

    startClock();

    // stop the clock on component unmount
    return async () => {
      if (clock) await clock.stop();
    };
  }, []);

  return (
    <div className='container'>
      <TimeDisplay hours={hours} minutes={minutes} seconds={seconds} />
    </div>
  );
};

export default forwardRef(DurationTimer);
