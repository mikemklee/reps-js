import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Main.scss';

import QuickActions from './QuickActions/QuickActions';
import ActivitySummary from './ActivitySummary/ActivitySummary';

import { InterfaceUtils } from '../../utils';

import WorkoutActions from '../../redux/workout/actions';

const Main = () => {
  const dispatch = useDispatch();
  const { userGivenName } = useSelector((state) => state.auth);
  const { workoutLogs } = useSelector((state) => state.workout);

  useEffect(() => {
    dispatch(WorkoutActions.getWorkoutLogsRequest());
  }, []);

  return (
    <div className='mainView'>
      <div className='mainView__header'>
        Good {InterfaceUtils.getTimeOfDay()}, <strong>{userGivenName}</strong>
      </div>
      <div className='mainView__content'>
        <div className='mainView__activitySummary'>
          <ActivitySummary logs={workoutLogs} />
        </div>
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
