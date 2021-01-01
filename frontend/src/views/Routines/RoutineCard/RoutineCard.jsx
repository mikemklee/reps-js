import React from 'react';
import { useHistory } from 'react-router-dom';
import { CgArrowTopRight } from 'react-icons/cg';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import _ from 'lodash';

import './RoutineCard.scss';

const RoutineCard = ({ routine, exerciseNames, onClickDelete }) => {
  const history = useHistory();

  // start with the first 3 exercises
  const includedExerciseNames = _.map(
    _.slice(routine.exercises, 0, 3),
    (item) => {
      return exerciseNames[item.exerciseId];
    }
  );

  const totalRoutineExercisesCount = routine.exercises.length;
  if (totalRoutineExercisesCount > 3) {
    includedExerciseNames.push(`...and ${totalRoutineExercisesCount - 3} more`);
  }

  return (
    <div className='routineCard'>
      <div className='routineCard__title'>{routine.name}</div>
      <div className='routineCard__exerciseList'>
        {_.map(includedExerciseNames, (item, index) => (
          <div key={index} className='routineCard__exerciseItem'>
            {item}
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
          onClick={() => history.push(`/workout/${routine._id}`)}
        >
          <CgArrowTopRight />
        </div>
      </div>
    </div>
  );
};

export default RoutineCard;
