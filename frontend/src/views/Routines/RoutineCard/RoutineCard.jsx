import React from 'react';
import { useHistory } from 'react-router-dom';
import { CgArrowTopRight } from 'react-icons/cg';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import _ from 'lodash';

import './RoutineCard.scss';

const RoutineCard = ({ routine, exerciseNames }) => {
  const history = useHistory();

  return (
    <div className='routineCard'>
      <div className='routineCard__title'>{routine.name}</div>
      <div className='routineCard__exerciseList'>
        {_.map(routine.exercises, (item) => (
          <div key={item.exerciseId} className='routineCard__exerciseItem'>
            {exerciseNames[item.exerciseId]}
          </div>
        ))}
      </div>
      <div className='routineCard__buttonContainer'>
        <div
          className='routineCard__button routineCard__button--secondary'
          title='Delete this routine'
        >
          <BiTrash />
        </div>
        <div
          className='routineCard__button routineCard__button--secondary'
          title='Edit this routine'
        >
          <BiEditAlt />
        </div>
        <div
          className='routineCard__button routineCard__button--primary'
          title='Start new workout from this routine'
          onClick={() => history.push({ pathname: `/workout/${routine._id}` })}
        >
          <CgArrowTopRight />
        </div>
      </div>
    </div>
  );
};

export default RoutineCard;
