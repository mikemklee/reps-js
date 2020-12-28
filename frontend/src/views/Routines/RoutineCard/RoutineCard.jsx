import React from 'react';
import { useHistory } from 'react-router-dom';
import { CgArrowTopRight } from 'react-icons/cg';

import './RoutineCard.scss';

const RoutineCard = ({ routine, exerciseNames }) => {
  const history = useHistory();

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
      <div
        className='routineCard__button'
        onClick={() => history.push({ pathname: `/workout/${routine._id}` })}
      >
        <CgArrowTopRight />
      </div>
    </div>
  );
};

export default RoutineCard;
