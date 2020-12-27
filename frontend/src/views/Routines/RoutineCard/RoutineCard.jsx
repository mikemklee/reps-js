import React from 'react';

import './RoutineCard.scss';

const RoutineCard = ({ routine, exercisePresets }) => {
  return (
    <div className='routineCard'>
      <div className='routineCard__title'>{routine.name}</div>
      <div className='routineCard__exerciseList'>
        {routine.exercises.map((exercise) => {
          const exerciseData = exercisePresets.find(
            (routine) => routine._id === exercise.presetId
          );
          return (
            <div key={exercise.presetId} className='routineCard__exerciseItem'>
              {exerciseData.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoutineCard;
