import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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

import usePrevious from '../../hooks/usePrevious';

const Workout = () => {
  const [counter, setCounter] = useState(0);
  const [exercises, setExercises] = useState([]);
  const [setsByExercise, setExerciseSets] = useState({});

  const addExerciseModalRef = useRef(null);
  const cancelWorkoutModalRef = useRef(null);
  const restTimerModalRef = useRef(null);

  const { status } = useSelector((state) => state.workout);
  const prevStatus = usePrevious(status);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(WorkoutActions.resetWorkoutProgress());
  }, []);

  useEffect(() => {
    if (prevStatus && status) {
      if (!prevStatus.saveWorkoutSuccess && status.saveWorkoutSuccess) {
        history.push('/logs');
      }
    }
  }, [status, prevStatus]);

  const onAddExercise = (exercise) => {
    setExercises([...exercises, exercise]);
    onAddSet(exercise);
    addExerciseModalRef.current.close();
  };

  const onAddSet = (exercise) => {
    setExerciseSets((prev) => {
      const existingSets = prev[exercise.id] || [];
      return {
        ...setsByExercise,
        [exercise.id]: [
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
      const existingSets = prev[exercise.id];
      return {
        ...prev,
        [exercise.id]: existingSets.map((row, index) => {
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
      const existingSets = prev[exercise.id];
      return {
        ...prev,
        [exercise.id]: _.filter(
          existingSets,
          (_item, index) => index !== rowIndex
        ),
      };
    });
  };

  const onCompleteWorkout = () => {
    const formattedData = {
      name: 'New blank workout',
      exercises: Workout.formatExercisesData(setsByExercise),
      duration: counter,
    };

    dispatch(WorkoutActions.saveWorkoutRequest(formattedData));
  };

  const anySetCompleted = useCallback(() => {
    return _.reduce(
      setsByExercise,
      (acc, sets) => {
        acc = _.some(sets, (set) => set.completed);
        return acc;
      },
      false
    );
  }, [setsByExercise]);

  return (
    <div className='workout-view'>
      <div className='view-header'>Workout</div>
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
              onClick={onCompleteWorkout}
            >
              <span>Complete</span>
            </button>
          </div>
        </div>
        {exercises.map((exercise) => (
          <Exercise
            key={exercise.id}
            exercise={exercise}
            sets={setsByExercise[exercise.id] || []}
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
        <AddExercise exercises={exercises} onAddExercise={onAddExercise} />
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
      <Modal ref={restTimerModalRef}>
        <RestTimer onClose={() => restTimerModalRef.current.close()} />
      </Modal>
    </div>
  );
};

Workout.formatExercisesData = (setsByExercise) => {
  return _.map(setsByExercise, (sets, exerciseId) => ({
    exerciseId,
    sets: _.map(sets, (set) => ({
      kg: parseInt(set.kg, 10),
      reps: parseInt(set.reps, 10),
    })),
  }));
};

export default Workout;
