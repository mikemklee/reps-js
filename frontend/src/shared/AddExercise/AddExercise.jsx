import React from 'react';
import classnames from 'classnames';
import { FiCheck } from 'react-icons/fi';

import './AddExercise.scss';

import ExercisePresets from '../../views/Exercises/Exercises.metadata';

const AddExercise = ({ exercises, onAddExercise }) => {
  const selectedExerciseIds = exercises.map((item) => item.id);
  return (
    <div className='add-exercise'>
      <div className='add-exercise-header'>Add exercise</div>
      <div className='exercise-list'>
        {ExercisePresets.map((item) => (
          <div
            key={item.id}
            className={classnames({
              exercise: true,
              selected: selectedExerciseIds.includes(item.id),
            })}
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
            {selectedExerciseIds.includes(item.id) ? (
              <div className='selected-icon'>
                <FiCheck />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddExercise;
