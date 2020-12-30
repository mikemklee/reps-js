import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import './Logs.scss';

import WorkoutCard from './WorkoutCard/WorkoutCard';

import { Modal, Confirmation } from '../../shared';

import WorkoutActions from '../../redux/workout/actions';

const Logs = () => {
  const [deleteId, setDeleteId] = useState(null);
  const deleteWorkoutModalRef = useRef(null);
  const dispatch = useDispatch();
  const { workoutLogs } = useSelector((state) => state.workout);

  useEffect(() => {
    dispatch(WorkoutActions.getWorkoutLogsRequest());
  }, []);

  const onCancelDelete = () => {
    setDeleteId(null);
    deleteWorkoutModalRef.current.close();
  };

  const onConfirmDelete = () => {
    dispatch(WorkoutActions.deleteWorkoutRequest(deleteId));
    setDeleteId(null);
    deleteWorkoutModalRef.current.close();
  };

  return (
    <div className='logs-view'>
      <div className='view-header'>Logs</div>
      <div className='view-content'>
        <div className='logs'>
          {_.map(workoutLogs, (workout, index) => (
            <WorkoutCard
              key={index}
              workout={workout}
              onClickDelete={(workoutId) => {
                setDeleteId(workoutId);
                deleteWorkoutModalRef.current.open();
              }}
            />
          ))}
        </div>
        <Modal ref={deleteWorkoutModalRef}>
          <Confirmation
            isWarning
            title='Delete workout'
            subtitle={
              <>
                <p>
                  Are you sure you would like to delete this workout session?
                </p>
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

export default Logs;
