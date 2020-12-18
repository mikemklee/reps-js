import React from 'react';

import './AddExercise.scss';

import ExercisePresets from '../../views/Exercises/Exercises.metadata';

const AddExercise = ({ onAddExercise }) => {
  return (
    <div className='add-exercise'>
      <div className='add-exercise-header'>Add exercise</div>
      <div className='exercise-list'>
        {ExercisePresets.map((item) => (
          <div
            key={item.id}
            className='exercise'
            onClick={() => onAddExercise(item)}
          >
            <div className='exercise-image'></div>
            <div className='exercise-meta'>
              <div className='exercise-meta-title'>{item.name}</div>
              <div className='exercise-meta-bodypart'>
                <span>Targets</span>
                {item.bodyPart}
              </div>
              <div className='exercise-meta-category'>
                <span>Category</span>
                {item.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddExercise;
