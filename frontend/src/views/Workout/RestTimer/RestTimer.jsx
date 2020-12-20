import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import moment from 'moment';

import './RestTimer.scss';
import TimeDisplay from '../../../shared/TimeDisplay/TimeDisplay';
import ProgressRing from '../../../shared/ProgressRing/ProgressRing';

const calculateProgress = (timeRemaining, duration) => {
  const fractionRemaining = timeRemaining / duration;
  const fractionElapsed = 1 - fractionRemaining;
  return fractionElapsed * 100;
};

const RestTimer = () => {
  const [restDuration, setRestDuration] = useState(10);
  const [secondsRemaining, setSecondsRemaining] = useState(restDuration);
  const [isActive, setIsActive] = useState(false);

  const onToggle = () => setIsActive(!isActive);
  const onReset = () => {
    setSecondsRemaining(restDuration);
    setIsActive(false);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      // time remaining; decrement counter
      if (secondsRemaining) {
        interval = setInterval(() => {
          setSecondsRemaining((seconds) => seconds - 1);
        }, 1000);
      } else {
        // time up; notify user?
        clearInterval(interval);
      }
    } else if (!isActive) {
      // stop counting
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsRemaining]);

  const duration = moment.duration(secondsRemaining, 'seconds');
  const minutes = Math.floor(duration.minutes());
  const seconds = duration.seconds() % 60;
  const progress = calculateProgress(secondsRemaining, restDuration);

  return (
    <div className='rest-timer'>
      <div className='rest-timer-header'>Rest timer</div>
      <ProgressRing radius={140} strokeWidth={10} progress={progress}>
        <div className='time-remaining'>
          <TimeDisplay minutes={minutes} seconds={seconds} />
        </div>
      </ProgressRing>
      <div className='rest-timer-footer'>
        <button className='rest-timer-reset-btn' onClick={onReset}>
          <span>Reset</span>
        </button>
        <button
          className={classnames({
            'rest-timer-toggle-btn': true,
            isActive,
          })}
          onClick={onToggle}
        >
          <span>{isActive ? 'Pause' : progress ? 'Resume' : 'Start'}</span>
        </button>
      </div>
    </div>
  );
};

export default RestTimer;
