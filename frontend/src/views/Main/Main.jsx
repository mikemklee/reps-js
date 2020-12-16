import React from 'react';

import './Main.scss';
import QuickActions from './QuickActions/QuickActions';

import { InterfaceUtils } from '../../utils';

const Main = () => {
  return (
    <div className='view-container'>
      <div className='view-header'>
        {InterfaceUtils.getTimeOfDayGreeting()}, <strong>Mike</strong>
      </div>
      <div className='main-view'>
        <QuickActions />
        <div className='weekly-progress'>TODO: Show weekly progress</div>
        <div className='workout-curation'>TODO: Show workout curation</div>
      </div>
    </div>
  );
};

export default Main;
