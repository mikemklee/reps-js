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
        <div className='exerciseCardList'>
          {presets.map((item) => (
            <div key={item._id} className='exerciseCard'>
              <div className='exerciseCard__title'>{item.name}</div>
              <div className='exerciseCard__details'>
                <span className='exerciseCard__detailKey'>Targets</span>
                {item.bodyParts.map((part, index) => (
                  <span
                    key={index}
                    className='exerciseCard__detailValue exerciseCard__detailValue--bodypart'
                  >
                    {part}
                  </span>
                ))}
              </div>
              <div className='exerciseCard__details'>
                <span className='exerciseCard__detailKey'>Category</span>
                <span className='exerciseCard__detailValue exerciseCard__detailValue--category'>
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exercises;
