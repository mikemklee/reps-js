import React from 'react';
import _ from 'lodash';

import './LogItemExercise.scss';

import ExercisePresets from '../../../Exercises/Exercises.metadata';

const LogItemExercise = ({ exerciseId, sets }) => {
  const exerciseData = ExercisePresets.find((item) => item.id === exerciseId);

  return (
    <div className='log-item-exercise'>
      <div className='log-item-exercise-name'>{exerciseData.name}</div>
      <div className='log-item-exercise-sets'>
        {_.map(sets, (set, index) => (
          <div key={index} className='log-item-exercise-sets-item'>
            <div className='set-number'>{index + 1}</div>
            <div className='set-reps'>
              {set.kg} kg x {set.reps}
            </div>
            <div className='set-volume'>{set.kg * set.reps} lb</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogItemExercise;
