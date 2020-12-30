import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Exercises.scss';

import ExerciseActions from '../../redux/exercise/actions';
import { ExerciseCardList } from '../../shared';

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
        <ExerciseCardList presets={presets} />
      </div>
    </div>
  );
};

export default Exercises;
