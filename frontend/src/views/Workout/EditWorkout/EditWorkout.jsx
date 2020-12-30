import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { VscAdd } from 'react-icons/vsc';
import classnames from 'classnames';
import _ from 'lodash';

import './EditWorkout.scss';

import Exercise from '../Exercise/Exercise';
import WorkoutMeta from '../../Logs/WorkoutCard/WorkoutMeta/WorkoutMeta';

import Modal from '../../../shared/Modal/Modal';
import AddExercise from '../../../shared/AddExercise/AddExercise';
import Confirmation from '../../../shared/Confirmation/Confirmation';

import WorkoutActions from '../../../redux/workout/actions';
import ExerciseActions from '../../../redux/exercise/actions';

import usePrevious from '../../../hooks/usePrevious';
import useExercises from '../../../hooks/useExercises';

import WorkoutUtils from '../../../utils/workout';

const EditWorkout = () => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(0);
  const [workout, setWorkout] = useState(null);
  const [
    exercises,
    setsByExercise,
    anySetCompleted,
    onAddExercise,
    onAddSavedExercise,
    onAddSet,
    onEditSet,
    onRemoveSet,
  ] = useExercises();

  const addExerciseModalRef = useRef(null);
  const saveWorkoutModalRef = useRef(null);

  const { workoutLogs, status: workoutStatus } = useSelector(
    (state) => state.workout
  );
  const { presets: exercisePresets, status: exerciseStatus } = useSelector(
    (state) => state.exercise
  );
  const prevWorkoutStatus = usePrevious(workoutStatus);
  const prevExerciseStatus = usePrevious(exerciseStatus);

  const dispatch = useDispatch();
  const history = useHistory();
  const { workoutId } = useParams();

  useEffect(() => {
    dispatch(WorkoutActions.resetWorkoutProgress());
    dispatch(ExerciseActions.getPresetsRequest());
  }, []);

  useEffect(() => {
    if (prevWorkoutStatus && workoutStatus) {
      if (
        !prevWorkoutStatus.editWorkoutSuccess &&
        workoutStatus.editWorkoutSuccess
      ) {
        history.push('/logs');
        return;
      }
    }

    if (prevExerciseStatus && exerciseStatus) {
      if (
        !prevExerciseStatus.getPresetsSuccess &&
        exerciseStatus.getPresetsSuccess
      ) {
        populateExerciseSections();
      }
    }
  }, [workoutStatus, prevWorkoutStatus, exerciseStatus, prevExerciseStatus]);

  const populateExerciseSections = () => {
    if (workoutId) {
      if (_.isEmpty(workoutLogs)) {
        // no workout data available; redirect to home page
        history.push('/');
      } else {
        const currentWorkout = workoutLogs[workoutId];

        // set workout
        setTitle(currentWorkout.name);
        setDuration(currentWorkout.duration);
        setWorkout(currentWorkout);

        // add exercises
        _.forEach(currentWorkout.exercises, (item) => {
          // DX: skip exercises that are already included
          if (setsByExercise[item.presetId]) return;
          const exercisePreset = exercisePresets[item.presetId];
          onAddSavedExercise(item, exercisePreset);
        });
      }
    }
  };

  const onSaveWorkout = () => {
    const formattedData = {
      name: title,
      exercises: WorkoutUtils.formatExercisesData(setsByExercise),
      duration,
    };

    dispatch(WorkoutActions.editWorkoutRequest(workoutId, formattedData));
  };

  return (
    <div className='workout-view'>
      <div className='view-header'>Edit {title}</div>
      <div className='view-content'>
        <div className='workout-controls'>
          {workout ? <WorkoutMeta vertical item={workout} /> : null}
          <div className='workout-controls-actions'>
            <button
              className='cancel-workout-btn'
              onClick={() => history.goBack()}
            >
              <span>Cancel</span>
            </button>
            <button
              className={classnames({
                'finish-workout-btn': true,
                disabled: !anySetCompleted,
              })}
              onClick={() => saveWorkoutModalRef.current.open()}
            >
              <span>Save</span>
            </button>
          </div>
        </div>
        {exercises.map((exercise) => (
          <Exercise
            key={exercise._id}
            exercise={exercise}
            sets={setsByExercise[exercise._id] || []}
            onAddSet={onAddSet}
            onEditSet={onEditSet}
            onRemoveSet={onRemoveSet}
          />
        ))}
        <button
          className='add-exercise-btn'
          onClick={() => addExerciseModalRef.current.open()}
        >
          <VscAdd />
          <span>Add exercise</span>
        </button>
      </div>
      <Modal ref={addExerciseModalRef}>
        <AddExercise
          exercisePresets={exercisePresets}
          selectedExercises={exercises}
          onAddExercise={(item) => {
            onAddExercise(item);
            addExerciseModalRef.current.close();
          }}
        />
      </Modal>
      <Modal ref={saveWorkoutModalRef}>
        <Confirmation
          title='Edit workout'
          subtitle={
            <>
              <p>Are you sure you would like to edit this workout session?</p>
              <p>Any existing data will be overriden.</p>
            </>
          }
          onCancel={() => saveWorkoutModalRef.current.close()}
          onConfirm={onSaveWorkout}
        />
      </Modal>
    </div>
  );
};

export default EditWorkout;
