import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import './Routines.scss';

import RoutineCard from './RoutineCard/RoutineCard';

import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner';

import RoutineActions from '../../redux/routine/actions';

const Routines = () => {
  const dispatch = useDispatch();
  const { names: exerciseNames, status: exerciseStatus } = useSelector(
    (state) => state.exercise
  );
  const { presets: routinePresets, status: routineStatus } = useSelector(
    (state) => state.routine
  );

  useEffect(() => {
    dispatch(RoutineActions.getPresetsRequest());
  }, []);

  const loading =
    exerciseStatus.getPresetsPending || routineStatus.getPresetsPending;

  return (
    <div className='routines-view'>
      <div className='view-header'>Routines</div>
      <div className='view-content'>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className='routines'>
            {_.map(routinePresets, (item) => (
              <RoutineCard
                key={item._id}
                routine={item}
                exerciseNames={exerciseNames}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Routines;
