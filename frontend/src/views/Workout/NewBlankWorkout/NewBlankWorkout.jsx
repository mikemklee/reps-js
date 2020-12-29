import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { VscAdd } from 'react-icons/vsc';
import { FaStopwatch } from 'react-icons/fa';
import classnames from 'classnames';
import _ from 'lodash';

import './NewBlankWorkout.scss';

import Timer from '../Timer/Timer';
import Exercise from '../Exercise/Exercise';
import RestTimer from '../RestTimer/RestTimer';

import Modal from '../../../shared/Modal/Modal';
import AddExercise from '../../../shared/AddExercise/AddExercise';
import Confirmation from '../../../shared/Confirmation/Confirmation';

import WorkoutActions from '../../../redux/workout/actions';
import ExerciseActions from '../../../redux/exercise/actions';

import usePrevious from '../../../hooks/usePrevious';
import useExercises from '../../../hooks/useExercises';

const NewBlankWorkout = () => {
  const title = 'New blank workout';
  const [counter, setCounter] = useState(0);
  const [
    exercises,
    setsByExercise,
    anySetCompleted,
    onAddExercise,
    onAddSet,
    onEditSet,
    onRemoveSet,
  ] = useExercises();

  const addExerciseModalRef = useRef(null);
  const cancelWorkoutModalRef = useRef(null);
  const saveWorkoutModalRef = useRef(null);
  const restTimerModalRef = useRef(null);

  const { status: workoutStatus } = useSelector((state) => state.workout);
  const { presets: exercisePresets } = useSelector((state) => state.exercise);
  const prevWorkoutStatus = usePrevious(workoutStatus);

  const dispatch = useDispatch();
  const history = useHistory();

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
  }, [workoutStatus, prevWorkoutStatus]);

  const onCompleteWorkout = () => {
    const formattedData = {
      name: title,
      exercises: NewBlankWorkout.formatExercisesData(setsByExercise),
      duration: counter,
    };

    dispatch(WorkoutActions.saveWorkoutRequest(formattedData));
  };

  return (
    <div className='workout-view'>
      <div className='view-header'>{title}</div>
      <div className='view-content'>
        <div className='workout-controls'>
          <div className='workout-controls-duration-timer'>
            <label>Time elapsed: </label>
            <Timer counter={counter} setCounter={setCounter} />
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

NewBlankWorkout.formatExercisesData = (setsByExercise) => {
  return _.map(setsByExercise, (sets, presetId) => ({
    presetId,
    sets: _.map(sets, (set) => ({
      kg: parseInt(set.kg, 10),
      reps: parseInt(set.reps, 10),
    })),
  }));
};

export default NewBlankWorkout;
