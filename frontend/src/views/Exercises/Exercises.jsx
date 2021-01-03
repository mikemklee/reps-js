import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Exercises.scss';

import { ExerciseBrowser, ContentPlaceholder } from '../../shared';

import ExerciseActions from '../../redux/exercise/actions';

const Exercises = () => {
  const dispatch = useDispatch();
  const { presets, status: exerciseStatus } = useSelector(
    (state) => state.exercise
  );

  useEffect(() => {
    dispatch(ExerciseActions.getPresetsRequest());
  }, []);

  const loading = exerciseStatus.getPresetsPending;

  return (
    <div className='exercisesView'>
      <div className='exercisesView__header'>Exercises</div>
      <div className='exercisesView__content'>
        {loading ? (
          <div className='exercisesView__placeholders'>
            {Array(10)
              .fill()
              .map((val, index) => (
                <ContentPlaceholder key={index} />
              ))}
          </div>
        ) : (
          <ExerciseBrowser customExercises={{}} presetExercises={presets} />
        )}
      </div>
    </div>
  );
};

export default Exercises;
