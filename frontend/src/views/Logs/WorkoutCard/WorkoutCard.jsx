import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import _ from 'lodash';

import './WorkoutCard.scss';
import ExerciseSummary from './ExerciseSummary/ExerciseSummary';
import WorkoutMeta from './WorkoutMeta/WorkoutMeta';

const WorkoutCard = ({ workout, onClickDelete }) => {
  const history = useHistory();

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className='workoutCard'>
      <div className='workoutCard__name'>{workout.name}</div>
      <WorkoutMeta showVolume item={workout} />
      <div className='workoutCard__exercises'>
        {_.map(workout.exercises, (item) => (
          <ExerciseSummary
            key={item.exerciseId}
            isExpanded={isExpanded}
            exercise={item}
          />
        ))}
      </div>
      <div className='workoutCard__buttonContainer'>
        <div
          className='workoutCard__button'
          title='Collapse'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <IoMdArrowDropup /> Collapse
            </>
          ) : (
            <>
              <IoMdArrowDropdown /> Expand
            </>
          )}
        </div>
        <div
          className='workoutCard__button workoutCard__button--secondary'
          title='Delete this workout'
          onClick={() => onClickDelete(workout._id)}
        >
          <BiTrash />
        </div>
        <div
          className='workoutCard__button workoutCard__button--primary'
          title='Edit this workout'
          onClick={() => history.push(`/workout/${workout._id}/edit`)}
        >
          <BiEditAlt />
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
