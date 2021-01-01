import React from 'react';
import { useSelector } from 'react-redux';

import './Main.scss';
import QuickActions from './QuickActions/QuickActions';

import { InterfaceUtils } from '../../utils';

const Main = () => {
  const { userDisplayName } = useSelector((state) => state.auth);
  return (
    <div className='main-view'>
      <div className='view-header'>
        Good {InterfaceUtils.getTimeOfDay()}, <strong>{userDisplayName}</strong>
      </div>
      <div className='view-content'>
        <QuickActions />
      </div>
      {/* <div className='weekly-progress'>TODO: Show weekly progress</div> */}
      {/* <div className='workout-curation'>TODO: Show workout curation</div> */}
    </div>
  );
};

export default Main;
