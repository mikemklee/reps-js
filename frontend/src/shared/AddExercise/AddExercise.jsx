import React from 'react';

import './AddExercise.scss';

import ExerciseBrowser from '../ExerciseBrowser/ExerciseBrowser';

const AddExercise = ({ exercisePresets, selectedExercises, onAddExercise }) => {
  const selectedExerciseIds = selectedExercises.map((item) => item._id);
  return (
    <div className='addExercise'>
      <div className='addExercise__header'>Add exercise</div>
      <ExerciseBrowser
        presetExercises={exercisePresets}
        selectedIds={selectedExerciseIds}
        onSelectItem={onAddExercise}
      />
    </div>
  );
};

export default AddExercise;
