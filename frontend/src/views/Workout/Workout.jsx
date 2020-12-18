import React, { useState, useRef } from 'react';

import './Workout.scss';

import Timer from './Timer/TImer';
import Modal from '../../shared/Modal/Modal';
import AddExercise from '../../shared/AddExercise/AddExercise';

const Workout = () => {
  const [counter, setCounter] = useState(0);
  const [exercises, setExercises] = useState([]);
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
        {exercises.map((exercise, index) => (
          <div key={index} className='exercise-section-container'>
            <div className='exercise-section'>{exercise.name}</div>
          </div>
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
