import React from 'react';

const TimeDisplay = ({ hours = null, minutes = null, seconds = null }) => {
  return (
    <div className='time'>
      {hours !== null ? (
        <>
          <span className='hours'>
            {hours < 10 && 0}
            {hours}
          </span>
          <span>:</span>
        </>
      ) : null}
      {minutes !== null ? (
        <>
          <span className='minutes'>
            {minutes < 10 && 0}
            {minutes}
          </span>
          <span>:</span>
        </>
      ) : null}
      {seconds !== null ? (
        <>
          <span className='seconds'>
            {seconds < 10 && 0}
            {seconds}
          </span>
        </>
      ) : null}
    </div>
  );
};

export default TimeDisplay;
