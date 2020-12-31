import React from 'react';
import classnames from 'classnames';

import './DualButton.scss';

const DualButton = ({
  currentValue = null,
  firstOption = null,
  onClickOption = () => {},
  secondOption = null,
}) => {
  if (!firstOption || !secondOption) return null;
  return (
    <div className='dualButton'>
      <button
        className={classnames('dualButton__firstOption', {
          current: currentValue === firstOption.value,
        })}
        onClick={() => onClickOption(firstOption.value)}
      >
        {firstOption.label}
      </button>
      <button
        className={classnames('dualButton__secondOption', {
          current: currentValue === secondOption.value,
        })}
        onClick={() => onClickOption(secondOption.value)}
      >
        {secondOption.label}
      </button>
    </div>
  );
};

export default DualButton;
