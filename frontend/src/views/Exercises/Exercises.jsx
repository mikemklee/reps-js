import React from 'react';

import './Exercises.scss';

import ExercisePresets from './Exercises.metadata';

const Exercises = () => {
  return (
    <div className='exercises-view'>
      <div className='view-header'>Exercises</div>
      <div className='view-content'>
        <div className='exercise-card-container'>
          {ExercisePresets.map((item) => (
            <div key={item.id} className='exercise-card'>
              <div className='exercise-card-title'>{item.name}</div>
              <div className='exercise-card-bodypart'>
                <span>Targets</span>
                {item.bodyPart}
              </div>
              <div className='exercise-card-category'>
                <span>Category</span>
                {item.category}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exercises;
