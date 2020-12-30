import React from 'react';
import { useHistory } from 'react-router-dom';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import _ from 'lodash';

import './WorkoutCard.scss';
import ExerciseSummary from './ExerciseSummary/ExerciseSummary';
import WorkoutMeta from './WorkoutMeta/WorkoutMeta';

const WorkoutCard = ({ workout, onClickDelete }) => {
  const history = useHistory();

  return (
    <div className='workoutCard'>
      <div className='workoutCard__name'>{workout.name}</div>
      <WorkoutMeta showVolume item={workout} />
      <div className='workoutCard__exercises'>
        {_.map(workout.exercises, (item) => (
          <ExerciseSummary key={item.exerciseId} exercise={item} />
        ))}
      </div>
      <div className='workoutCard__buttonContainer'>
        <div
          className='workoutCard__button workoutCard__button--primary'
          onClick={() => history.push(`/workout/${workout._id}/edit`)}
        >
          <BiEditAlt />
        </div>
        <div
          className='workoutCard__button workoutCard__button--secondary'
          onClick={() => onClickDelete(workout._id)}
        >
          <BiTrash />
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
