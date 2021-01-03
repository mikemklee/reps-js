import React from 'react';
import { useSelector } from 'react-redux';

import './Main.scss';

import QuickActions from './QuickActions/QuickActions';

import { InterfaceUtils } from '../../utils';

const Main = () => {
  const { userGivenName } = useSelector((state) => state.auth);

  // TODO: get saved workout dates for each month from DB

  return (
    <div className='mainView'>
      <div className='mainView__header'>
        Good {InterfaceUtils.getTimeOfDay()}, <strong>{userGivenName}</strong>
      </div>
      <div className='mainView__content'>
        <div className='mainView__quickActions'>
          <QuickActions />
        </div>
      </div>
      {/* <div className='weekly-progress'>TODO: Show weekly progress</div> */}
      {/* <div className='workout-curation'>TODO: Show workout curation</div> */}
    </div>
  );
};

export default Main;
