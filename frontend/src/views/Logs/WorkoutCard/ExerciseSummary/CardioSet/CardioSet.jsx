import React from 'react';
import moment from 'moment';

import useDistanceConverter from '../../../../../hooks/useDistanceConverter';

const CardioSet = ({ set, index }) => {
  const {
    currentDistanceUnit,
    computeDisplayedDistance,
  } = useDistanceConverter();

  const durationObj = moment.duration(set.duration, 'seconds');

  return (
    <div className='exerciseSummary__set'>
      <div className='exerciseSummary__setNumber'>{index + 1}</div>
      <div className='exerciseSummary__setSummary'>
        {Number(computeDisplayedDistance(set.km).toFixed(2))}{' '}
        {currentDistanceUnit} x {durationObj.hours()} hours{' '}
        {durationObj.minutes()} mins
      </div>
    </div>
  );
};

export default CardioSet;
