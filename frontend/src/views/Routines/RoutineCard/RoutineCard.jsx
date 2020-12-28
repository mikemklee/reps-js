import React from 'react';
import { useHistory } from 'react-router-dom';
import { CgArrowTopRight } from 'react-icons/cg';

import './RoutineCard.scss';

const RoutineCard = ({ routine, exerciseNames }) => {
  const history = useHistory();

  return (
    <div
      className='routineCard'
      title='Start new workout from this routine'
      onClick={() => history.push({ pathname: `/workout/${routine._id}` })}
    >
      <div className='routineCard__title'>{routine.name}</div>
      <div className='routineCard__exerciseList'>
        {routine.exercises.map((exercise) => (
          <div key={exercise.presetId} className='routineCard__exerciseItem'>
            {exerciseNames[exercise.presetId]}
          </div>
        ))}
      </div>
      <div className='routineCard__button'>
        <CgArrowTopRight />
      </div>
    </div>
  );
};

export default RoutineCard;
