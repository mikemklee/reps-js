import React from 'react';
import classnames from 'classnames';

import './Confirmation.scss';

const Confirmation = ({
  title = 'Are you sure?',
  subtitle = '',
  onConfirm = () => {},
  onCancel = () => {},
  isWarning = false,
}) => {
  return (
    <div className='confirmation'>
      {title ? <div className='confirmation-title'>{title}</div> : null}
      {subtitle ? (
        <div className='confirmation-subtitle'>{subtitle}</div>
      ) : null}
      <div className='confirmation-btn-container'>
        <button className='confirmation-cancel-btn' onClick={onCancel}>
          <span>Cancel</span>
        </button>
        <button
          className={classnames({
            'confirmation-confirm-btn': true,
            isWarning: isWarning,
          })}
          onClick={onConfirm}
        >
          <span>Continue</span>
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
