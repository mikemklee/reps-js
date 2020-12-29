import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { VscAdd } from 'react-icons/vsc';
import { FaStopwatch } from 'react-icons/fa';
import classnames from 'classnames';
import _ from 'lodash';

import './Workout.scss';

import Timer from './Timer/Timer';
import Exercise from './Exercise/Exercise';
import RestTimer from './RestTimer/RestTimer';

import Modal from '../../shared/Modal/Modal';
import AddExercise from '../../shared/AddExercise/AddExercise';
import Confirmation from '../../shared/Confirmation/Confirmation';

import WorkoutActions from '../../redux/workout/actions';
import ExerciseActions from '../../redux/exercise/actions';

import usePrevious from '../../hooks/usePrevious';

const Workout = () => {
  const [title, setTitle] = useState('');
  const [counter, setCounter] = useState(0);
  const [exercises, setExercises] = useState([]);
  const [setsByExercise, setExerciseSets] = useState({});

  const addExerciseModalRef = useRef(null);
  const cancelWorkoutModalRef = useRef(null);
  const saveWorkoutModalRef = useRef(null);
  const restTimerModalRef = useRef(null);

  const { status: workoutStatus } = useSelector((state) => state.workout);
  const { presets: routinePresets } = useSelector((state) => state.routine);
  const { presets: exercisePresets, status: exerciseStatus } = useSelector(
    (state) => state.exercise
  );
  const prevWorkoutStatus = usePrevious(workoutStatus);
  const prevExerciseStatus = usePrevious(exerciseStatus);

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

      if (
        !prevExerciseStatus.getPresetsSuccess &&
        exerciseStatus.getPresetsSuccess
      ) {
        populateExerciseSections();
      }
    }
  }, [workoutStatus, prevWorkoutStatus, exerciseStatus, prevExerciseStatus]);

  const populateExerciseSections = () => {
    if (routineId) {
      if (routineId === 'new') {
        // blank workout; just update workout title
        setTitle('New blank workout');
      } else {
        // routine workout; populate exercises with routine data
        if (_.isEmpty(routinePresets)) {
          // no routine data available; redirect to home page
          history.push('/');
        } else {
          const currentRoutine = routinePresets.find(
            (preset) => preset._id === routineId
          );

          // update workout title
          setTitle(currentRoutine.name);

          // add exercises
          _.forEach(currentRoutine.exercises, (item) => {
            // DX: skip exercises that are already included
            if (setsByExercise[item.presetId]) return;
            const exercisePreset = exercisePresets.find(
              (preset) => preset._id === item.presetId
            );
            onAddExercise(exercisePreset, item.numSets);
          });
        }
      }
    }
  };

  const onAddExercise = (exercise, numSets = 1) => {
    setExercises((prev) => [...prev, exercise]);
    for (let i = 0; i < numSets; i++) {
      onAddSet(exercise);
    }
    addExerciseModalRef.current.close();
  };

  const onAddSet = (exercise) => {
    setExerciseSets((prev) => {
      const existingSets = prev[exercise._id] || [];
      return {
        ...prev,
        [exercise._id]: [
          ...existingSets,
          {
            id: existingSets.length + 1,
            set: existingSets.length + 1,
            previous: '',
            kg: 0,
            reps: 0,
            completed: false,
          },
        ],
      };
    });
  };

  const onEditSet = (exercise, rowIndex, columnId, value) => {
    setExerciseSets((prev) => {
      const existingSets = prev[exercise._id];
      return {
        ...prev,
        [exercise._id]: existingSets.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...existingSets[rowIndex],
              [columnId]: value,
            };
          }
          return row;
        }),
      };
    });
  };

  const onRemoveSet = (exercise, rowIndex) => {
    setExerciseSets((prev) => {
      const existingSets = prev[exercise._id];
      return {
        ...prev,
        [exercise._id]: _.filter(
          existingSets,
          (_item, index) => index !== rowIndex
        ),
      };
    });
  };

  const onCompleteWorkout = () => {
    const formattedData = {
      name: title,
      exercises: Workout.formatExercisesData(setsByExercise),
      duration: counter,
    };

    dispatch(WorkoutActions.saveWorkoutRequest(formattedData));
  };

  const anySetCompleted = useCallback(() => {
    const allSets = _.flatMap(setsByExercise);
    return _.some(allSets, (set) => set.completed);
  }, [setsByExercise]);

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
                disabled: !anySetCompleted(),
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
          onAddExercise={onAddExercise}
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

Workout.formatExercisesData = (setsByExercise) => {
  return _.map(setsByExercise, (sets, presetId) => ({
    presetId,
    sets: _.map(sets, (set) => ({
      kg: parseInt(set.kg, 10),
      reps: parseInt(set.reps, 10),
    })),
  }));
};

export default Workout;
