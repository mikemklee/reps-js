import React from 'react';

import { TimeUtils } from '../../../../../utils';

const DurationSet = ({ set, index }) => {
  const { hours, minutes } = TimeUtils.parseDuration(set.duration);

  return (
    <div className='exerciseSummary__set'>
      <div className='exerciseSummary__setNumber'>{index + 1}</div>
      <div className='exerciseSummary__setSummary'>
        {hours} hours {minutes} mins
      </div>
    </div>
  );
};

export default DurationSet;
