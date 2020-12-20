import React, { useState, useRef } from 'react';
import _ from 'lodash';
import { VscAdd } from 'react-icons/vsc';

import './Workout.scss';

import Timer from './Timer/TImer';
import Modal from '../../shared/Modal/Modal';
import AddExercise from '../../shared/AddExercise/AddExercise';
import Exercise from './Exercise/Exercise';

import ExercisePresets from '../../views/Exercises/Exercises.metadata';

const Workout = () => {
  const [counter, setCounter] = useState(0);
  const [exercises, setExercises] = useState([ExercisePresets[0]]);
  const [setsByExercise, setExerciseSets] = useState({});
  const addExerciseModalRef = useRef(null);

  const onAddExercise = (exercise) => {
    setExercises([...exercises, exercise]);
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

  return (
    <div className='workout-view'>
      <div className='view-header'>Workout</div>
      <div className='view-content'>
        <div className='workout-controls'>
          <div className='workout-controls-timer'>
            <label>Time elapsed: </label>
            <Timer counter={counter} setCounter={setCounter} />
          </div>
          <div className='workout-controls-actions'>
            <button className='cancel-workout-btn'>
              <span>Cancel</span>
            </button>
            <button className='finish-workout-btn'>
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
        <AddExercise onAddExercise={onAddExercise} />
      </Modal>
    </div>
  );
};

export default Workout;
