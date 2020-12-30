import React from 'react';
import { useHistory } from 'react-router-dom';
import { CgArrowTopRight } from 'react-icons/cg';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import _ from 'lodash';

import './RoutineCard.scss';

const RoutineCard = ({ routine, exerciseNames, onClickDelete }) => {
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
        {routine.isPreset ? null : (
          <>
            <div
              className='routineCard__button routineCard__button--secondary'
              title='Delete this routine'
              onClick={() => onClickDelete(routine._id)}
            >
              <BiTrash />
            </div>
            <div
              className='routineCard__button routineCard__button--secondary'
              title='Edit this routine'
              onClick={() => history.push(`/routines/${routine._id}/edit`)}
            >
              <BiEditAlt />
            </div>
          </>
        )}
        <div
          className='routineCard__button routineCard__button--primary'
          title='Start new workout from this routine'
          onClick={() => history.push(`/routines/${routine._id}`)}
        >
          <CgArrowTopRight />
        </div>
      </div>
    </div>
  );
};

export default RoutineCard;
