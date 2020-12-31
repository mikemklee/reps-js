import React from 'react';
import moment from 'moment';
import { BiTimeFive } from 'react-icons/bi';
import { FaWeightHanging } from 'react-icons/fa';
import classnames from 'classnames';
import _ from 'lodash';

import './WorkoutMeta.scss';

import useWeightConverter from '../../../../hooks/useWeightConverter';

const WorkoutMeta = ({ item, vertical = false, showVolume = false }) => {
  const { currentUnit, computeDisplayedWeight } = useWeightConverter();

  const formattedCompletedAt = moment(item.createdAt).format(
    'h:mm A dddd, Do MMM YYYY'
  );
  const formattedDuration = moment
    .duration(item.timeElapsed, 'seconds')
    .minutes();
  const totalVolumeInKG = _.reduce(
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
    <div className={classnames('workoutMeta', { vertical })}>
      <div className='workoutMeta__completedAt'>{formattedCompletedAt}</div>
      <div className='workoutMeta__duration'>
        <BiTimeFive />
        <span>{formattedDuration} minutes</span>
      </div>
      {showVolume ? (
        <div className='workoutMeta__volume'>
          <FaWeightHanging />
          <span>
            {Number(computeDisplayedWeight(totalVolumeInKG).toFixed(2))}{' '}
            {currentUnit}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(WorkoutMeta);
