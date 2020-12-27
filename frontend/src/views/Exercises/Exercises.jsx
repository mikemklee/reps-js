import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Exercises.scss';

import ExerciseActions from '../../redux/exercise/actions';

const Exercises = () => {
  const dispatch = useDispatch();
  const { presets } = useSelector((state) => state.exercise);

  useEffect(() => {
    dispatch(ExerciseActions.getPresetsRequest());
  }, []);

  return (
    <div className='exercises-view'>
      <div className='view-header'>Exercises</div>
      <div className='view-content'>
        <div className='exercise-card-container'>
          {presets.map((item) => (
            <div key={item._id} className='exercise-card'>
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
