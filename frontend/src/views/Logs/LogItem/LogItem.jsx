import React from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { BiTimeFive, BiEditAlt } from 'react-icons/bi';
import { FaWeightHanging } from 'react-icons/fa';
import _ from 'lodash';

import './LogItem.scss';
import LogItemExercise from './LogItemExercise/LogItemExercise';

const LogItem = ({ item }) => {
  const history = useHistory();

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
      <div className='logs-item-buttons'>
        <div
          className='logs-item__button'
          onClick={() => history.push(`/workout/${item._id}/edit`)}
        >
          <BiEditAlt />
        </div>
      </div>
    </div>
  );
};

export default LogItem;
