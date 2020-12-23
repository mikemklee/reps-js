import React from 'react';
import _ from 'lodash';

import './LogItemExercise.scss';

const LogItemExercise = ({ exerciseId, sets }) => {
  return (
    <div className='log-item-exercise'>
      Exercise: {exerciseId}
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
