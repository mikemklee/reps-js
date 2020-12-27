import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import { BiTimeFive } from 'react-icons/bi';
import { FaWeightHanging } from 'react-icons/fa';

import './LogItem.scss';
import LogItemExercise from './LogItemExercise/LogItemExercise';

const LogItem = ({ item }) => {
  const formattedCompletedAt = moment(item.completedAt).format(
    'h:mm A dddd, d MMM YYYY'
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
    <div className='logs-item'>
      <div className='logs-item-name'>{item.name}</div>
      <div className='logs-item-meta'>
        <div className='logs-item-meta-completedAt'>{formattedCompletedAt}</div>
        <div className='logs-item-meta-duration'>
          <BiTimeFive />
          <span>{formattedDuration} minutes</span>
        </div>
        <div className='logs-item-meta-volume'>
          <FaWeightHanging />
          <span>{totalVolume} kg</span>
        </div>
      </div>
      <div className='logs-item-exercises'>
        {_.map(item.exercises, (exercise) => (
          <LogItemExercise key={exercise.presetId} exercise={exercise} />
        ))}
      </div>
    </div>
  );
};

export default LogItem;
