import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import './LogItemExercise.scss';

import ExerciseActions from '../../../../redux/exercise/actions';

const LogItemExercise = ({ exercise }) => {
  const dispatch = useDispatch();
  const { presets } = useSelector((state) => state.exercise);

  useEffect(() => {
    dispatch(ExerciseActions.getPresetsRequest());
  }, []);

  const exerciseData = presets.find((item) => item._id === exercise.presetId);

  return (
    <div className='log-item-exercise'>
      <div className='log-item-exercise-name'>
        {exerciseData ? exerciseData.name : ''}
      </div>
      <div className='log-item-exercise-sets'>
        {_.map(exercise.sets, (set, index) => (
          <div key={index} className='log-item-exercise-sets-item'>
            <div className='set-number'>{index + 1}</div>
            <div className='set-reps'>
              {set.kg} kg x {set.reps}
            </div>
            <div className='set-volume'>{set.kg * set.reps} kg</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogItemExercise;
