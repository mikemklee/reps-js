import React from 'react';

import { useWeightConverter } from '../../../../../hooks';

const WeightSet = ({ set, sign, index }) => {
  const { currentWeightUnit, computeDisplayedWeight } = useWeightConverter();

  return (
    <div className='exerciseSummary__set'>
      <div className='exerciseSummary__setNumber'>{index + 1}</div>
      <div className='exerciseSummary__setSummary'>
        {sign}
        {Number(computeDisplayedWeight(set.kg).toFixed(2))} {currentWeightUnit}{' '}
        x {set.reps}
      </div>
    </div>
  );
};

export default WeightSet;
