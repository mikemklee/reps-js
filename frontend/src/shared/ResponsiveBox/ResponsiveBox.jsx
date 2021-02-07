import React from 'react';

import './ResponsiveBox.scss';

const ResponsiveBox = ({ children }) => {
  return <div className='responsiveBox'>{children}</div>;
};

export default ResponsiveBox;
