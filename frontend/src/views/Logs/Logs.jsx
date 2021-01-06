import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Logs.scss';

import WorkoutCardList from './WorkoutCardList/WorkoutCardList';

import { Modal, Confirmation, ContentPlaceholder } from '../../shared';

import ExerciseActions from '../../redux/exercise/actions';
import WorkoutActions from '../../redux/workout/actions';

const Logs = () => {
  const [deleteId, setDeleteId] = useState(null);
  const deleteWorkoutModalRef = useRef(null);

  const dispatch = useDispatch();
  const { status: exerciseStatus } = useSelector((state) => state.exercise);
  const { workoutLogs, status: workoutStatus } = useSelector(
    (state) => state.workout
  );

  useEffect(() => {
    dispatch(WorkoutActions.getWorkoutLogsRequest());
    dispatch(ExerciseActions.getPresetsRequest());
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

  const loading =
    exerciseStatus.getPresetsPending || workoutStatus.getWorkoutLogsPending;

  return (
    <div className='logsView'>
      <div className='logsView__header'>Logs</div>
      <div className='logsView__content'>
        {loading ? (
          <div className='logsView__placeholders'>
            {Array(10)
              .fill()
              .map((val, index) => (
                <ContentPlaceholder key={index} />
              ))}
          </div>
        ) : (
          <WorkoutCardList
            title='Workout history'
            placeholder='You do not have any workout sessions saved yet.'
            workoutLogs={workoutLogs}
            onDeleteWorkout={(workoutId) => {
              setDeleteId(workoutId);
              deleteWorkoutModalRef.current.open();
            }}
          />
        )}
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
