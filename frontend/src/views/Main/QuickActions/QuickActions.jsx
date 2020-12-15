import React from 'react';

import { GiWeightLiftingUp } from 'react-icons/gi';
import { HiOutlineClipboardList } from 'react-icons/hi';

import './QuickActions.scss';

const QuickActions = () => {
  return (
    <div className='quick-actions'>
      <label className='section-title'>Quick actions</label>
      <div className='action-card-container'>
        <div className='action-card'>
          <label className='action-card-title'>Start new workout</label>
          <GiWeightLiftingUp className='action-card-icon' />
        </div>
        <div className='action-card'>
          <label className='action-card-title'>View workout logs</label>
          <HiOutlineClipboardList className='action-card-icon' />
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
