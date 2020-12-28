import React from 'react';

import './RoutineCard.scss';

const RoutineCard = ({ routine, exerciseNames }) => {
  return (
    <div className='routineCard'>
      <div className='routineCard__title'>{routine.name}</div>
      <div className='routineCard__exerciseList'>
        {routine.exercises.map((exercise) => (
          <div key={exercise.presetId} className='routineCard__exerciseItem'>
            {exerciseNames[exercise.presetId]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoutineCard;
