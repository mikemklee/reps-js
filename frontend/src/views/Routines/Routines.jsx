import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { VscAdd } from 'react-icons/vsc';

import './Routines.scss';

import RoutineCardList from './RoutineCardList/RoutineCardList';

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
    <div className='routinesView'>
      <div className='routinesView__header'>Routines</div>
      <div className='routinesView__content'>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className='routineControlBar'>
              <button
                className='routineControlBar__addNew'
                onClick={() => history.push('/routines/new')}
              >
                <VscAdd />
                <span>Add new routine</span>
              </button>
            </div>
            <RoutineCardList
              title='Custom routines'
              placeholder='You do not have any custom routines yet.'
              routines={customRoutines}
              exerciseNames={exerciseNames}
              onDeleteRoutine={(routineId) => {
                setDeleteId(routineId);
                deleteRoutineModalRef.current.open();
              }}
            />
            <RoutineCardList
              title='Preset routines'
              routines={presetRoutines}
              exerciseNames={exerciseNames}
            />
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
