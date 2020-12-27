import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { FiCheck } from 'react-icons/fi';

import './AddExercise.scss';

import ExerciseActions from '../../redux/exercise/actions';

const AddExercise = ({ exercises, onAddExercise }) => {
  const dispatch = useDispatch();
  const { presets } = useSelector((state) => state.exercise);

  useEffect(() => {
    dispatch(ExerciseActions.getPresetsRequest());
  }, []);

  const selectedExerciseIds = exercises.map((item) => item._id);
  return (
    <div className='add-exercise'>
      <div className='add-exercise-header'>Add exercise</div>
      <div className='exercise-list'>
        {presets.map((item) => (
          <div
            key={item._id}
            className={classnames({
              exercise: true,
              selected: selectedExerciseIds.includes(item._id),
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
            {selectedExerciseIds.includes(item._id) ? (
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
