import React, { useState, useRef } from 'react';
import { VscAdd } from 'react-icons/vsc';
import { RiAddLine } from 'react-icons/ri';

import './Workout.scss';

import Timer from './Timer/TImer';
import Modal from '../../shared/Modal/Modal';
import AddExercise from '../../shared/AddExercise/AddExercise';
import Exercise from './Exercise/Exercise';

import ExercisePresets from '../../views/Exercises/Exercises.metadata';

const Workout = () => {
  const [counter, setCounter] = useState(0);
  const [exercises, setExercises] = useState([ExercisePresets[0]]);
  const addExerciseModalRef = useRef(null);

  const onAddExercise = (exercise) => {
    setExercises([...exercises, exercise]);
    addExerciseModalRef.current.close();
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
          <Exercise key={exercise.id} exercise={exercise} />
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
