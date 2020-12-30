import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { VscAdd } from 'react-icons/vsc';
import _ from 'lodash';

import './Routines.scss';

import RoutineCard from './RoutineCard/RoutineCard';

import { LoadingSpinner } from '../../shared';

import RoutineActions from '../../redux/routine/actions';

const Routines = () => {
  const history = useHistory();
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
          <>
            <div className='customRoutines'>
              <div className='customRoutines__title'>Custom routines</div>
              <div
                className='customRoutines__addNew'
                onClick={() => history.push('/routines/new')}
              >
                Add new custom routine
                <div className='customRoutines__addNew__icon'>
                  <VscAdd />
                </div>
              </div>
              <div className='customRoutines__routines'></div>
            </div>
            <div className='presetRoutines'>
              <div className='presetRoutines__title'>Preset routines</div>
              <div className='presetRoutines__routines'>
                {_.map(routinePresets, (item) => (
                  <RoutineCard
                    key={item._id}
                    routine={item}
                    exerciseNames={exerciseNames}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Routines;
