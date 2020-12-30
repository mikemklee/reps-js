import React from 'react';
import { useHistory } from 'react-router-dom';
import { BiEditAlt } from 'react-icons/bi';
import _ from 'lodash';

import './WorkoutCard.scss';
import ExerciseSummary from './ExerciseSummary/ExerciseSummary';
import WorkoutMeta from './WorkoutMeta/WorkoutMeta';

const WorkoutCard = ({ workout }) => {
  const history = useHistory();

  return (
    <div className='workoutCard'>
      <div className='workoutCard__name'>{workout.name}</div>
      <WorkoutMeta showVolume item={workout} />
      <div className='workoutCard__exercises'>
        {_.map(workout.exercises, (exercise) => (
          <ExerciseSummary key={exercise.presetId} exercise={exercise} />
        ))}
      </div>
      <div className='workoutCard__buttonContainer'>
        <div
          className='workoutCard__button'
          onClick={() => history.push(`/workout/${workout._id}/edit`)}
        >
          <BiEditAlt />
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
