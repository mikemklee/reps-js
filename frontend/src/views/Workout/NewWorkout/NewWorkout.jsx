import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { VscAdd } from 'react-icons/vsc';
import { FaStopwatch } from 'react-icons/fa';
import classnames from 'classnames';
import _ from 'lodash';

import './NewWorkout.scss';

import {
  DurationTimer,
  Exercise,
  RestTimer,
  Modal,
  AddExercise,
  Confirmation,
} from '../../../shared';

import { InterfaceUtils } from '../../../utils';

import WorkoutActions from '../../../redux/workout/actions';
import ExerciseActions from '../../../redux/exercise/actions';

import usePrevious from '../../../hooks/usePrevious';
import useExercises from '../../../hooks/useExercises';
import useWeightConverter from '../../../hooks/useWeightConverter';

const NewWorkout = () => {
  const [title, setTitle] = useState('');
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

  const counterRef = useRef(null);
  const addExerciseModalRef = useRef(null);
  const cancelWorkoutModalRef = useRef(null);
  const saveWorkoutModalRef = useRef(null);
  const restTimerModalRef = useRef(null);

  const { status: workoutStatus } = useSelector((state) => state.workout);
  const { presetRoutines, customRoutines } = useSelector(
    (state) => state.routine
  );
  const { presets: exercisePresets, status: exerciseStatus } = useSelector(
    (state) => state.exercise
  );
  const prevWorkoutStatus = usePrevious(workoutStatus);
  const prevExerciseStatus = usePrevious(exerciseStatus);
  const prevUnit = usePrevious(currentUnit);

  const dispatch = useDispatch();
  const history = useHistory();
  const { routineId } = useParams();

  useEffect(() => {
    dispatch(WorkoutActions.resetWorkoutProgress());
    dispatch(ExerciseActions.getPresetsRequest());
  }, []);

  useEffect(() => {
    if (prevWorkoutStatus && workoutStatus) {
      if (
        !prevWorkoutStatus.saveWorkoutSuccess &&
        workoutStatus.saveWorkoutSuccess
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
    if (routineId) {
      if (routineId === 'new') {
        // blank workout; just update workout title
        setTitle(`New ${InterfaceUtils.getTimeOfDay()} workout`);
      } else {
        // routine workout; populate exercises with routine data
        const allRoutines = {
          ...presetRoutines,
          ...customRoutines,
        };

        const currentRoutine = allRoutines[routineId];
        if (!currentRoutine) {
          // no routine data available; redirect to home page
          history.push('/');
        } else {
          let conversionFactor = 1;
          if (currentUnit === 'lb') {
            // values are stored as KG in the DB
            // need to convert KG weights to LB before we use them
            conversionFactor = getConversionFactor('kg', 'lb');
          }

          // update workout title
          setTitle(currentRoutine.name);

          // add exercises
          _.forEach(currentRoutine.exercises, (item) => {
            // DX: skip exercises that are already included
            if (setsByExercise[item.exerciseId]) return;
            const exercisePreset = exercisePresets[item.exerciseId];
            onAddSavedExercise(item, exercisePreset, conversionFactor, false);
          });
        }
      }
    }
  };

  const onCompleteWorkout = () => {
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
      duration: counterRef.current,
    };

    dispatch(WorkoutActions.saveWorkoutRequest(formattedData));
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
          <div className='workout-controls-duration-timer'>
            <label>Time elapsed: </label>
            <DurationTimer ref={counterRef} />
          </div>
          <div
            className='workout-controls-rest-timer'
            onClick={() => restTimerModalRef.current.open()}
          >
            <button>
              <FaStopwatch />
            </button>
          </div>
          <div className='workout-controls-actions'>
            <button
              className='cancel-workout-btn'
              onClick={() => cancelWorkoutModalRef.current.open()}
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
              <span>Finish</span>
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
      <Modal ref={cancelWorkoutModalRef}>
        <Confirmation
          isWarning
          title='Cancel workout'
          subtitle={
            <>
              <p>Are you sure you would like to cancel this workout session?</p>
              <p>Any recorded data for the session will be lost.</p>
            </>
          }
          onCancel={() => cancelWorkoutModalRef.current.close()}
          onConfirm={() => history.goBack()}
        />
      </Modal>
      <Modal ref={saveWorkoutModalRef}>
        <Confirmation
          title='Finish workout'
          subtitle={
            <>
              <p>Are you sure you would like to finish this workout session?</p>
              <p>Any invalid or empty sets will not be saved.</p>
            </>
          }
          onCancel={() => saveWorkoutModalRef.current.close()}
          onConfirm={onCompleteWorkout}
        />
      </Modal>
      <Modal ref={restTimerModalRef}>
        <RestTimer onClose={() => restTimerModalRef.current.close()} />
      </Modal>
    </div>
  );
};

export default NewWorkout;
