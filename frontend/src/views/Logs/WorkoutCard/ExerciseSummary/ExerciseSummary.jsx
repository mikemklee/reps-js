import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import './ExerciseSummary.scss';

import useWeightConverter from '../../../../hooks/useWeightConverter';

const ExerciseSummary = ({ exercise }) => {
  const { names: exerciseNames } = useSelector((state) => state.exercise);

  const { currentWeightUnit, computeDisplayedWeight } = useWeightConverter();

  return (
    <div className='exerciseSummary'>
      <div className='exerciseSummary__name'>
        {exerciseNames[exercise.exerciseId]}
      </div>
      <div className='exerciseSummary__setList'>
        {_.map(exercise.sets, (set, index) => (
          <div key={index} className='exerciseSummary__set'>
            <div className='exerciseSummary__setNumber'>{index + 1}</div>
            <div className='exerciseSummary__setReps'>
              {Number(computeDisplayedWeight(set.kg).toFixed(2))}{' '}
              {currentWeightUnit} x {set.reps}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseSummary;
