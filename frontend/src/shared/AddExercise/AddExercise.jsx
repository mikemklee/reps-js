import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './AddExercise.scss';

import ExerciseCardList from '../ExerciseCardList/ExerciseCardList';

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
      <ExerciseCardList
        presets={presets}
        selectedIds={selectedExerciseIds}
        onSelectItem={onAddExercise}
      />
    </div>
  );
};

export default AddExercise;
