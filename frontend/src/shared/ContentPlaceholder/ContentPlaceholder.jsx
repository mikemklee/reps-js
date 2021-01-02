import React from 'react';

import './ContentPlaceholder.scss';

const ContentPlaceholder = () => {
  return (
    <div className='contentPlaceholder'>
      <div className='faux-text-wrapper short shimmer'>
        <div className='faux-text' />
      </div>
      <div className='faux-text-wrapper shimmer'>
        <div className='faux-text' />
      </div>
      <div className='faux-image-wrapper shimmer'>
        <div className='faux-image' />
      </div>
    </div>
  );
};

export default ContentPlaceholder;
