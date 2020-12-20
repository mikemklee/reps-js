import React from 'react';
import classnames from 'classnames';

import './ProgressRing.scss';

const ProgressRing = ({
  radius = 10,
  strokeWidth = 2,
  progress = 0,
  children,
}) => {
  const strokeThickness = strokeWidth * 2;
  const normalizedRadius = radius - strokeThickness;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progressCircumerence = (progress / 100) * circumference;
  const strokeDashoffset = circumference - progressCircumerence;

  return (
    <div className='progress-ring'>
      <svg className='ring-container' height={radius * 2} width={radius * 2}>
        <circle
          className='empty-ring'
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          className={classnames({
            'colored-ring': true,
            animated: progress > 0,
          })}
          strokeWidth={strokeWidth}
          strokeLinecap='round'
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      {children}
    </div>
  );
};

export default ProgressRing;
