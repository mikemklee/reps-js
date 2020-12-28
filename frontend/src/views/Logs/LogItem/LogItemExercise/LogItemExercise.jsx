import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import './LogItemExercise.scss';

const LogItemExercise = ({ exercise }) => {
  const { names: exerciseNames } = useSelector((state) => state.exercise);

  return (
    <div className='log-item-exercise'>
      <div className='log-item-exercise-name'>
        {exerciseNames[exercise.presetId]}
      </div>
      <div className='log-item-exercise-sets'>
        {_.map(exercise.sets, (set, index) => (
          <div key={index} className='log-item-exercise-sets-item'>
            <div className='set-number'>{index + 1}</div>
            <div className='set-reps'>
              {set.kg} kg x {set.reps}
            </div>
            <div className='set-volume'>{set.kg * set.reps} kg</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogItemExercise;
