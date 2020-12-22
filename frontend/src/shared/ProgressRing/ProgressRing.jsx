import React from 'react';
import classnames from 'classnames';

import './ProgressRing.scss';

const ProgressRing = ({
  radius = 10,
  strokeWidth = 2,
  progress = 0,
  reverse = true,
  animated = false,
  children,
}) => {
  const strokeThickness = strokeWidth * 2;
  const normalizedRadius = radius - strokeThickness;
  const circumference = normalizedRadius * 2 * Math.PI;

  const directionMultiplier = reverse ? -1 : 1;
  const progressInFraction = (progress / 100) * directionMultiplier;
  const progressCircumerence = progressInFraction * circumference;
  const strokeDashoffset = circumference - progressCircumerence;

  return (
    <div className='progress-ring'>
      <svg className='ring-container' height={radius * 2} width={radius * 2}>
        <circle
          className={classnames({
            'static-ring': true,
            reverse,
          })}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          className={classnames({
            'animated-ring': true,
            animated,
            reverse,
          })}
          strokeWidth={strokeWidth * 1.1}
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
