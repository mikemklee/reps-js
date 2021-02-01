import React, { useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
import { VscAdd } from 'react-icons/vsc';
import * as Comlink from 'comlink';

import './RestTimer.scss';
import TimeDisplay from '../TimeDisplay/TimeDisplay';
import ProgressRing from '../ProgressRing/ProgressRing';

import { usePrevious } from '../../hooks';
import { TimeUtils } from '../../utils';

import ClockWorker from 'comlink-loader!../../workers/clock.worker';

const calculateProgress = (timeRemaining, duration) => {
  const fractionRemaining = timeRemaining / duration;
  const fractionElapsed = 1 - fractionRemaining;
  return fractionElapsed * 100;
};

const RestTimer = () => {
  const [restDuration, setRestDuration] = useState(10);
  const [secondsRemaining, setSecondsRemaining] = useState(restDuration);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);

  const onReset = () => {
    setSecondsRemaining(restDuration);
    setIsActive(false);
  };

  const onAddDuration = (addedDuration) => {
    setRestDuration(restDuration + addedDuration);
    setSecondsRemaining(secondsRemaining + addedDuration);
  };

  // start timer
  useEffect(() => {
    let timer;

    const createTimer = async () => {
      const clockWorker = new ClockWorker();

      // create a new timer instance
      timer = await new clockWorker.Timer();

      // store a ref to it
      timerRef.current = timer;
    };

    createTimer();

    // stop the timer on component unmount
    return async () => {
      if (timer) await timer.stop();
    };
  }, []);

  useEffect(() => {
    if (!timerRef.current) return;
    const timer = timerRef.current;

    const startTimer = async () => {
      const cb = () => {
        setSecondsRemaining((seconds) => seconds - 1);
      };

      await timer.start(Comlink.proxy(cb));
    };

    const stopTimer = async () => {
      await timer.stop();
    };

    if (isActive) {
      // time remaining; decrement counter
      if (secondsRemaining) {
        startTimer();
      } else {
        // time up; notify user?
        stopTimer();
        // TODO: investigate why there is a 1s "delay" in animation
        setTimeout(onReset, 1000);
      }
    } else if (!isActive) {
      // stop counting
      stopTimer();
    }

    // cleanup
    return async () => {
      stopTimer();
    };
  }, [isActive, secondsRemaining]);

  const { minutes, seconds } = TimeUtils.parseDuration(secondsRemaining);

  const progress = calculateProgress(secondsRemaining, restDuration);

  const prevDuration = usePrevious(restDuration);
  const animationDisabled = restDuration !== prevDuration;

  return (
    <div className='rest-timer'>
      <div className='rest-timer-header'>Rest timer</div>
      <ProgressRing
        radius={140}
        strokeWidth={10}
        progress={progress}
        animated={!animationDisabled && progress > 0}
      >
        <div className='time-remaining'>
          <TimeDisplay minutes={minutes} seconds={seconds} />
        </div>
      </ProgressRing>
      <div className='rest-timer-footer'>
        <div className='duration-btn-container'>
          <button
            className='add-duration-btn'
            onClick={() => onAddDuration(10)}
          >
            <VscAdd />
            <span>10 secs</span>
          </button>
          <button
            className='add-duration-btn'
            onClick={() => onAddDuration(30)}
          >
            <VscAdd />
            <span>30 secs</span>
          </button>
          <button
            className='add-duration-btn'
            onClick={() => onAddDuration(60)}
          >
            <VscAdd />
            <span>1 min</span>
          </button>
        </div>
        <div className='control-btn-container'>
          <button className='reset-btn' onClick={onReset}>
            <span>Reset</span>
          </button>
          <button
            className={classnames({
              'toggle-btn': true,
              isActive,
            })}
            onClick={() => setIsActive(!isActive)}
          >
            <span>{isActive ? 'Pause' : progress ? 'Resume' : 'Start'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestTimer;
