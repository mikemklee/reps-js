import React, { useState, useRef } from 'react';

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
        <Timer counter={counter} setCounter={setCounter} />
        {exercises.map((exercise) => (
          <Exercise key={exercise.id} exercise={exercise} />
        ))}
        <button
          className='add-exercise-btn'
          onClick={() => addExerciseModalRef.current.open()}
        >
          Add exercise
        </button>
        <button className='finish-workout-btn'>Complete workout</button>
        <button className='cancel-workout-btn'>Cancel workout</button>
      </div>
      <Modal ref={addExerciseModalRef}>
        <AddExercise onAddExercise={onAddExercise} />
      </Modal>
    </div>
  );
};

export default Workout;
