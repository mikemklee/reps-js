import React from 'react';

import './LoadingSpinner.scss';

const LoadingSpinner = ({ width = 20 }) => (
  <svg
    className='loadingSpinner'
    viewBox='0 0 100 100'
    xmlns='http://www.w3.org/2000/svg'
    style={{
      width,
    }}
  >
    <circle className='loadingSpinner__circle' cx='50' cy='50' r='45' />
  </svg>
);

export default LoadingSpinner;
