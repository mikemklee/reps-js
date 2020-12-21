import React, { useState, useRef } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { VscAdd } from 'react-icons/vsc';
import { FaStopwatch } from 'react-icons/fa';

import './Workout.scss';

import Timer from './Timer/Timer';
import Exercise from './Exercise/Exercise';
import RestTimer from './RestTimer/RestTimer';

import Modal from '../../shared/Modal/Modal';
import AddExercise from '../../shared/AddExercise/AddExercise';
import Confirmation from '../../shared/Confirmation/Confirmation';

const Workout = () => {
  const [counter, setCounter] = useState(0);
  const [exercises, setExercises] = useState([]);
  const [setsByExercise, setExerciseSets] = useState({});

  const addExerciseModalRef = useRef(null);
  const cancelWorkoutModalRef = useRef(null);
  const restTimerModalRef = useRef(null);

  const history = useHistory();

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
    console.log('what do i have so far?', exercises, setsByExercise);
  };

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
            <button className='finish-workout-btn' onClick={onCompleteWorkout}>
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

export default Workout;
