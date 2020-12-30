import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { VscAdd } from 'react-icons/vsc';
import _ from 'lodash';

import './Routines.scss';

import RoutineCard from './RoutineCard/RoutineCard';

import { Modal, Confirmation, LoadingSpinner } from '../../shared';

import RoutineActions from '../../redux/routine/actions';

const Routines = () => {
  const [deleteId, setDeleteId] = useState(null);
  const deleteRoutineModalRef = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const { names: exerciseNames, status: exerciseStatus } = useSelector(
    (state) => state.exercise
  );
  const { presetRoutines, customRoutines, status: routineStatus } = useSelector(
    (state) => state.routine
  );

  useEffect(() => {
    dispatch(RoutineActions.getPresetRoutinesRequest());
    dispatch(RoutineActions.getCustomRoutinesRequest());
  }, []);

  const onCancelDelete = () => {
    setDeleteId(null);
    deleteRoutineModalRef.current.close();
  };

  const onConfirmDelete = () => {
    dispatch(RoutineActions.deleteCustomRoutineRequest(deleteId));
    setDeleteId(null);
    deleteRoutineModalRef.current.close();
  };

  const loading =
    exerciseStatus.getPresetsPending ||
    routineStatus.getPresetRoutinesPending ||
    routineStatus.getCustomRoutinesPending;

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
              <div className='customRoutines__routines'>
                <div
                  className='customRoutines__addNew'
                  onClick={() => history.push('/routines/new')}
                >
                  Add new custom routine
                  <div className='customRoutines__addNew__icon'>
                    <VscAdd />
                  </div>
                </div>
                {_.map(customRoutines, (item) => (
                  <RoutineCard
                    key={item._id}
                    routine={item}
                    exerciseNames={exerciseNames}
                    onClickDelete={(routineId) => {
                      setDeleteId(routineId);
                      deleteRoutineModalRef.current.open();
                    }}
                  />
                ))}
              </div>
            </div>
            <div className='presetRoutines'>
              <div className='presetRoutines__title'>Preset routines</div>
              <div className='presetRoutines__routines'>
                {_.map(presetRoutines, (item) => (
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
        <Modal ref={deleteRoutineModalRef}>
          <Confirmation
            isWarning
            title='Delete routine'
            subtitle={
              <>
                <p>Are you sure you would like to delete this routine?</p>
                <p>Deleted data cannot be recovered.</p>
              </>
            }
            onCancel={onCancelDelete}
            onConfirm={onConfirmDelete}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Routines;
