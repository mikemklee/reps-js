import React from 'react';
import moment from 'moment';

const DurationSet = ({ set, index }) => {
  const durationObj = moment.duration(set.duration, 'seconds');

  return (
    <div className='exerciseSummary__set'>
      <div className='exerciseSummary__setNumber'>{index + 1}</div>
      <div className='exerciseSummary__setSummary'>
        {durationObj.hours()} hours {durationObj.minutes()} mins
      </div>
    </div>
  );
};

export default DurationSet;
