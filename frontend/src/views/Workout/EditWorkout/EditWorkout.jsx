import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { VscAdd } from 'react-icons/vsc';
import classnames from 'classnames';
import _ from 'lodash';

import './EditWorkout.scss';

import WorkoutMeta from '../../Logs/WorkoutCard/WorkoutMeta/WorkoutMeta';

import { Exercise, Modal, AddExercise, Confirmation } from '../../../shared';

import WorkoutActions from '../../../redux/workout/actions';
import ExerciseActions from '../../../redux/exercise/actions';

import usePrevious from '../../../hooks/usePrevious';
import useExercises from '../../../hooks/useExercises';
import useWeightConverter from '../../../hooks/useWeightConverter';

const EditWorkout = () => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(0);
  const [workout, setWorkout] = useState(null);
  const {
    exercises,
    setsByExercise,
    anySetCompleted,
    onAddExercise,
    onAddSavedExercise,
    onAddSet,
    onEditSet,
    onRemoveSet,
    onConvertUnit,
    onFormatExercisesData,
  } = useExercises();

  const { currentUnit, getConversionFactor } = useWeightConverter();

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
  const prevUnit = usePrevious(currentUnit);

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

  useEffect(() => {
    if (!_.isEqual(prevUnit, currentUnit)) {
      const conversionFactor = getConversionFactor(prevUnit, currentUnit);
      onConvertUnit(conversionFactor);
    }
  }, [prevUnit, currentUnit]);

  const populateExerciseSections = () => {
    if (workoutId) {
      if (_.isEmpty(workoutLogs)) {
        // no workout data available; redirect to home page
        history.push('/');
      } else {
        const currentWorkout = workoutLogs[workoutId];

        let conversionFactor = 1;
        if (currentUnit === 'lb') {
          // values are stored as KG in the DB
          // need to convert KG weights to LB before we use them
          conversionFactor = getConversionFactor('kg', 'lb');
        }

        // set workout
        setTitle(currentWorkout.name);
        setDuration(currentWorkout.duration);
        setWorkout(currentWorkout);

        // add exercises
        _.forEach(currentWorkout.exercises, (item) => {
          // DX: skip exercises that are already included
          if (setsByExercise[item.exerciseId]) return;
          const exercisePreset = exercisePresets[item.exerciseId];
          onAddSavedExercise(item, exercisePreset, conversionFactor, true);
        });
      }
    }
  };

  const onSaveWorkout = () => {
    let conversionFactor = 1;
    if (currentUnit === 'lb') {
      // values are stored as KG in the DB
      // need to convert LB weights to KG before we save them
      conversionFactor = getConversionFactor('lb', 'kg');
    }

    const FILTER_COMPLETED = true;
    const formattedData = {
      name: title,
      exercises: onFormatExercisesData(conversionFactor, FILTER_COMPLETED),
      duration,
    };

    dispatch(WorkoutActions.editWorkoutRequest(workoutId, formattedData));
  };

  return (
    <div className='workoutView'>
      <div className='workoutView__header'>
        <input
          className='workoutView__title workoutView__title--editable'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='workoutView__content'>
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
            allowComplete
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
