import React from 'react';
import moment from 'moment';
import { BiTimeFive } from 'react-icons/bi';
import { FaWeightHanging } from 'react-icons/fa';
import classnames from 'classnames';
import _ from 'lodash';

import './LogItemMeta.scss';

const LogItemMeta = ({ item, vertical = false, showVolume = false }) => {
  const formattedCompletedAt = moment(item.createdAt).format(
    'h:mm A dddd, Do MMM YYYY'
  );
  const formattedDuration = moment
    .duration(item.timeElapsed, 'seconds')
    .minutes();
  const totalVolume = _.reduce(
    item.exercises,
    (exerciseVolume, exercise) => {
      exerciseVolume += _.reduce(
        exercise.sets,
        (setVolume, set) => {
          setVolume += set.kg * set.reps;
          return setVolume;
        },
        0
      );
      return exerciseVolume;
    },
    0
  );

  return (
    <div className={classnames('logs-item-meta', { vertical })}>
      <div className='logs-item-meta-completedAt'>{formattedCompletedAt}</div>
      <div className='logs-item-meta-duration'>
        <BiTimeFive />
        <span>{formattedDuration} minutes</span>
      </div>
      {showVolume ? (
        <div className='logs-item-meta-volume'>
          <FaWeightHanging />
          <span>{totalVolume} kg</span>
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(LogItemMeta);
