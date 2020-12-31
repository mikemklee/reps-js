import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { VscAdd } from 'react-icons/vsc';
import classnames from 'classnames';
import _ from 'lodash';

import './NewRoutine.scss';

import { Exercise, Modal, AddExercise, Confirmation } from '../../../shared';

import RoutineActions from '../../../redux/routine/actions';
import ExerciseActions from '../../../redux/exercise/actions';

import usePrevious from '../../../hooks/usePrevious';
import useExercises from '../../../hooks/useExercises';

import WorkoutUtils from '../../../utils/workout';

const NewRoutine = () => {
  const [title, setTitle] = useState('');
  const {
    exercises,
    setsByExercise,
    onAddExercise,
    onAddSet,
    onEditSet,
    onRemoveSet,
  } = useExercises();

  const addExerciseModalRef = useRef(null);
  const saveRoutineModalRef = useRef(null);

  const { status: routineStatus } = useSelector((state) => state.routine);
  const { presets: exercisePresets, status: exerciseStatus } = useSelector(
    (state) => state.exercise
  );
  const prevRoutineStatus = usePrevious(routineStatus);
  const prevExerciseStatus = usePrevious(exerciseStatus);

  const dispatch = useDispatch();
  const history = useHistory();
  const { workoutId } = useParams();

  useEffect(() => {
    dispatch(ExerciseActions.getPresetsRequest());
  }, []);

  useEffect(() => {
    if (prevRoutineStatus && routineStatus) {
      if (
        !prevRoutineStatus.saveRoutineSuccess &&
        routineStatus.saveRoutineSuccess
      ) {
        history.push('/routines');
        return;
      }
    }

    if (prevExerciseStatus && exerciseStatus) {
      if (
        !prevExerciseStatus.getPresetsSuccess &&
        exerciseStatus.getPresetsSuccess
      ) {
        populateExerciseSections();
      }
    }
  }, [routineStatus, prevRoutineStatus, exerciseStatus, prevExerciseStatus]);

  const populateExerciseSections = () => {
    if (workoutId) {
      if (workoutId === 'new') {
        // creating routine from scratch; just update routine title
        setTitle('New routine');
      } else {
        // creating routine from saved workout; populate exercises with workout data
        // if (_.isEmpty(routinePresets)) {
        //   // no routine data available; redirect to home page
        //   history.push('/');
        // } else {
        //   const currentRoutine = routinePresets[workoutId];
        //   // update routine title
        //   setTitle(currentRoutine.name);
        //   // add exercises
        //   _.forEach(currentRoutine.exercises, (item) => {
        //     // DX: skip exercises that are already included
        //     if (setsByExercise[item.presetId]) return;
        //     onAddExercise(exercisePresets[item.presetId], item.numSets);
        //   });
        // }
      }
    }
  };

  const onSaveRoutine = () => {
    const formattedData = {
      name: title,
      exercises: WorkoutUtils.formatExercisesData(setsByExercise),
    };

    dispatch(RoutineActions.saveRoutineRequest(formattedData));
  };

  return (
    <div className='workoutView'>
      <div className='workoutView__header'>
        <input
          className='workoutView__title workoutView__title--editable'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='workoutView__content'>
        <div className='workout-controls'>
          <div className='workout-controls-actions'>
            <button
              className='cancel-workout-btn'
              onClick={() => history.goBack()}
            >
              <span>Cancel</span>
            </button>
            <button
              className={classnames({
                'finish-workout-btn': true,
                disabled: _.isEmpty(setsByExercise),
              })}
              onClick={() => saveRoutineModalRef.current.open()}
            >
              <span>Save</span>
            </button>
          </div>
        </div>
        {exercises.map((exercise) => (
          <Exercise
            key={exercise._id}
            exercise={exercise}
            sets={setsByExercise[exercise._id] || []}
            onAddSet={onAddSet}
            onEditSet={onEditSet}
            onRemoveSet={onRemoveSet}
          />
        ))}
        <button
          className='add-exercise-btn'
          onClick={() => addExerciseModalRef.current.open()}
        >
          <VscAdd />
          <span>Add exercise</span>
        </button>
      </div>
      <Modal ref={addExerciseModalRef}>
        <AddExercise
          exercisePresets={exercisePresets}
          selectedExercises={exercises}
          onAddExercise={(item) => {
            onAddExercise(item);
            addExerciseModalRef.current.close();
          }}
        />
      </Modal>
      <Modal ref={saveRoutineModalRef}>
        <Confirmation
          title='Save routine'
          subtitle={
            <>
              <p>Are you sure you would like to save this routine?</p>
              <p>Any invalid or empty sets will not be saved.</p>
            </>
          }
          onCancel={() => saveRoutineModalRef.current.close()}
          onConfirm={onSaveRoutine}
        />
      </Modal>
    </div>
  );
};

export default NewRoutine;