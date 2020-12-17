import React from 'react';

import './Main.scss';
import QuickActions from './QuickActions/QuickActions';

import { InterfaceUtils } from '../../utils';

const Main = () => {
  return (
    <div className='main-view'>
      <div className='view-header'>
        {InterfaceUtils.getTimeOfDayGreeting()}, <strong>Mike</strong>
      </div>
      <QuickActions />
      {/* <div className='weekly-progress'>TODO: Show weekly progress</div> */}
      {/* <div className='workout-curation'>TODO: Show workout curation</div> */}
    </div>
  );
};

export default Main;
