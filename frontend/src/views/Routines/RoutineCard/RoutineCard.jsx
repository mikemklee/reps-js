import React from 'react';
import { useHistory } from 'react-router-dom';
import { CgArrowTopRight } from 'react-icons/cg';
import _ from 'lodash';

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
        {_.map(routine.exercises, (item) => (
          <div key={item.exerciseId} className='routineCard__exerciseItem'>
            {exerciseNames[item.exerciseId]}
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
