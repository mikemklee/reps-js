import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import './ExerciseSummary.scss';

const ExerciseSummary = ({ exercise }) => {
  const { names: exerciseNames } = useSelector((state) => state.exercise);

  return (
    <div className='exerciseSummary'>
      <div className='exerciseSummary__name'>
        {exerciseNames[exercise.presetId]}
      </div>
      <div className='exerciseSummary__setList'>
        {_.map(exercise.sets, (set, index) => (
          <div key={index} className='exerciseSummary__set'>
            <div className='exerciseSummary__setNumber'>{index + 1}</div>
            <div className='exerciseSummary__setReps'>
              {set.kg} kg x {set.reps}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseSummary;
