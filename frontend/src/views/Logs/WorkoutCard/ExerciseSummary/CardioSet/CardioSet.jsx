import React from 'react';

import { useDistanceConverter } from '../../../../../hooks';
import { TimeUtils } from '../../../../../utils';

const CardioSet = ({ set, index }) => {
  const {
    currentDistanceUnit,
    computeDisplayedDistance,
  } = useDistanceConverter();

  const { hours, minutes } = TimeUtils.parseDuration(set.duration);

  return (
    <div className='exerciseSummary__set'>
      <div className='exerciseSummary__setNumber'>{index + 1}</div>
      <div className='exerciseSummary__setSummary'>
        {Number(computeDisplayedDistance(set.km).toFixed(2))}{' '}
        {currentDistanceUnit} x {hours} hours {minutes} mins
      </div>
    </div>
  );
};

export default CardioSet;
