import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import { VscAdd } from 'react-icons/vsc';

import './RestTimer.scss';
import TimeDisplay from '../TimeDisplay/TimeDisplay';
import ProgressRing from '../ProgressRing/ProgressRing';
import usePrevious from '../../hooks/usePrevious';

const calculateProgress = (timeRemaining, duration) => {
  const fractionRemaining = timeRemaining / duration;
  const fractionElapsed = 1 - fractionRemaining;
  return fractionElapsed * 100;
};

const RestTimer = () => {
  const [restDuration, setRestDuration] = useState(10);
  const [secondsRemaining, setSecondsRemaining] = useState(restDuration);
  const [isActive, setIsActive] = useState(false);

  const onReset = () => {
    setSecondsRemaining(restDuration);
    setIsActive(false);
  };

  const onAddDuration = (addedDuration) => {
    setRestDuration(restDuration + addedDuration);
    setSecondsRemaining(secondsRemaining + addedDuration);
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
        // TODO: investigate why there is a 1s "delay" in animation
        setTimeout(onReset, 1000);
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
