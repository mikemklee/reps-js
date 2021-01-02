import React from 'react';

const RepsSet = ({ set, index }) => {
  return (
    <div className='exerciseSummary__set'>
      <div className='exerciseSummary__setNumber'>{index + 1}</div>
      <div className='exerciseSummary__setSummary'>{set.reps}</div>
    </div>
  );
};

export default RepsSet;
